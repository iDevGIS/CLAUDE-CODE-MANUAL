const { load, save, emptyState } = require('./store');
const { validateTitle, validatePriority, validateTag, validateId } = require('./validate');

function addTask({ title, priority = 'med', tags = [] }, dbPath) {
  const titleErr = validateTitle(title);
  if (titleErr) throw new Error(titleErr);
  const prErr = validatePriority(priority);
  if (prErr) throw new Error(prErr);
  for (const t of tags) {
    const tagErr = validateTag(t);
    if (tagErr) throw new Error(tagErr);
  }

  const state = load(dbPath);
  const task = {
    id: state.nextId++,
    title: title.trim(),
    priority,
    tags: [...new Set(tags)],
    done: false,
    createdAt: new Date().toISOString(),
    completedAt: null,
  };
  state.items.push(task);
  save(state, dbPath);
  return task;
}

function listTasks({ done, tag, priority } = {}, dbPath) {
  let items = load(dbPath).items;
  if (done !== undefined) items = items.filter((t) => t.done === done);
  if (tag) items = items.filter((t) => t.tags.includes(tag));
  if (priority) items = items.filter((t) => t.priority === priority);
  return items;
}

function findTask(id, dbPath) {
  const idErr = validateId(id);
  if (idErr) throw new Error(idErr);
  return load(dbPath).items.find((t) => t.id === id) || null;
}

function completeTask(id, dbPath) {
  const idErr = validateId(id);
  if (idErr) throw new Error(idErr);
  const state = load(dbPath);
  const task = state.items.find((t) => t.id === id);
  if (!task) return null;
  if (task.done) return task;
  task.done = true;
  task.completedAt = new Date().toISOString();
  save(state, dbPath);
  return task;
}

function removeTask(id, dbPath) {
  const idErr = validateId(id);
  if (idErr) throw new Error(idErr);
  const state = load(dbPath);
  const before = state.items.length;
  state.items = state.items.filter((t) => t.id !== id);
  if (state.items.length === before) return false;
  save(state, dbPath);
  return true;
}

function searchTasks(query, dbPath) {
  if (typeof query !== 'string' || query.trim() === '') return [];
  const q = query.toLowerCase();
  return load(dbPath).items.filter(
    (t) => t.title.toLowerCase().includes(q) || t.tags.some((tag) => tag.toLowerCase().includes(q)),
  );
}

function statsTasks(dbPath) {
  const items = load(dbPath).items;
  const total = items.length;
  const done = items.filter((t) => t.done).length;
  const byPriority = items.reduce((acc, t) => {
    acc[t.priority] = (acc[t.priority] || 0) + 1;
    return acc;
  }, {});
  return { total, done, open: total - done, byPriority };
}

function resetTasks(dbPath) {
  return save(emptyState(), dbPath);
}

module.exports = {
  addTask,
  listTasks,
  findTask,
  completeTask,
  removeTask,
  searchTasks,
  statsTasks,
  resetTasks,
};
