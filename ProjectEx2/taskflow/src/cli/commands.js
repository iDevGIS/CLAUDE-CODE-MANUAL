const task = require('../core/task');
const { formatTask, formatList, formatStats } = require('./format');

function parseFlags(args) {
  const flags = {};
  const rest = [];
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a.startsWith('--')) {
      const [k, v] = a.slice(2).split('=');
      flags[k] = v === undefined ? args[++i] : v;
    } else {
      rest.push(a);
    }
  }
  return { flags, rest };
}

function cmdAdd(args, out) {
  const { flags, rest } = parseFlags(args);
  const title = rest.join(' ').trim();
  if (!title) return out.err('usage: taskflow add <title> [--priority low|med|high] [--tag <name>]');
  const tags = flags.tag ? [flags.tag] : [];
  const t = task.addTask({ title, priority: flags.priority || 'med', tags });
  out.log(`+ added #${t.id}: ${t.title}`);
}

function cmdList(args, out) {
  const { flags } = parseFlags(args);
  const filter = {};
  if (flags.done === 'true') filter.done = true;
  if (flags.done === 'false') filter.done = false;
  if (flags.tag) filter.tag = flags.tag;
  if (flags.priority) filter.priority = flags.priority;
  out.log(formatList(task.listTasks(filter)));
}

function cmdShow(args, out) {
  const id = parseInt(args[0], 10);
  const t = task.findTask(id);
  if (!t) return out.err(`! no task #${id}`);
  out.log(formatTask(t));
}

function cmdDone(args, out) {
  const id = parseInt(args[0], 10);
  const t = task.completeTask(id);
  out.log(t ? `* completed #${id}` : `! no task #${id}`);
}

function cmdRm(args, out) {
  const id = parseInt(args[0], 10);
  const ok = task.removeTask(id);
  out.log(ok ? `- removed #${id}` : `! no task #${id}`);
}

function cmdSearch(args, out) {
  const q = args.join(' ').trim();
  if (!q) return out.err('usage: taskflow search <query>');
  out.log(formatList(task.searchTasks(q)));
}

function cmdStats(_args, out) {
  out.log(formatStats(task.statsTasks()));
}

function cmdHelp(_args, out) {
  out.log(`taskflow — task management CLI

Commands:
  add <title>            add a task
                         flags: --priority low|med|high  --tag <name>
  list                   list tasks
                         flags: --done true|false  --tag <name>  --priority <p>
  show <id>              show one task
  done <id>              mark task complete
  rm <id>                remove task
  search <query>         search by title or tag
  stats                  show counts by status/priority
  help                   show this help

Env:
  TASKFLOW_DB            path to JSON store (default: .taskflow.json)`);
}

const COMMANDS = {
  add: cmdAdd,
  list: cmdList,
  ls: cmdList,
  show: cmdShow,
  done: cmdDone,
  rm: cmdRm,
  search: cmdSearch,
  stats: cmdStats,
  help: cmdHelp,
};

function run(argv, out = { log: console.log, err: (m) => console.error(m) }) {
  const [cmd, ...args] = argv;
  const handler = COMMANDS[cmd] || COMMANDS.help;
  try {
    handler(args, out);
    return 0;
  } catch (e) {
    out.err(`! ${e.message}`);
    return 1;
  }
}

module.exports = { run, COMMANDS };
