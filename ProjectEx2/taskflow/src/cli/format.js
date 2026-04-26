const PRIORITY_MARK = { low: 'L', med: 'M', high: 'H' };

function formatTask(task) {
  const status = task.done ? '[x]' : '[ ]';
  const pr = PRIORITY_MARK[task.priority] || '?';
  const tags = task.tags.length ? ` #${task.tags.join(' #')}` : '';
  return `${status} #${task.id} (${pr}) ${task.title}${tags}`;
}

function formatList(tasks) {
  if (tasks.length === 0) return '(no tasks)';
  return tasks.map(formatTask).join('\n');
}

function formatStats(s) {
  const lines = [
    `total:    ${s.total}`,
    `done:     ${s.done}`,
    `open:     ${s.open}`,
    `priority: ${Object.entries(s.byPriority).map(([k, v]) => `${k}=${v}`).join(' ') || '-'}`,
  ];
  return lines.join('\n');
}

module.exports = { formatTask, formatList, formatStats };
