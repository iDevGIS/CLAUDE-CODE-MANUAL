#!/usr/bin/env node
const { addTodo, listTodos, completeTodo, removeTodo } = require('./lib/todo');

const [, , cmd, ...args] = process.argv;

const commands = {
  add: () => {
    const text = args.join(' ').trim();
    if (!text) return console.error('Usage: todo add <text>');
    const t = addTodo(text);
    console.log(`+ Added #${t.id}: ${t.text}`);
  },
  list: () => {
    const todos = listTodos();
    if (todos.length === 0) return console.log('(no todos)');
    todos.forEach(t => {
      const mark = t.done ? '[x]' : '[ ]';
      console.log(`${mark} #${t.id}  ${t.text}`);
    });
  },
  done: () => {
    const id = parseInt(args[0], 10);
    const t = completeTodo(id);
    console.log(t ? `* Completed #${id}` : `! No todo #${id}`);
  },
  rm: () => {
    const id = parseInt(args[0], 10);
    const ok = removeTodo(id);
    console.log(ok ? `- Removed #${id}` : `! No todo #${id}`);
  },
  help: () => {
    console.log(`todo — simple CLI todo
  todo add <text>    add a new todo
  todo list          list all todos
  todo done <id>     mark todo as done
  todo rm <id>       remove a todo
  todo help          show this help`);
  }
};

(commands[cmd] || commands.help)();
