const task = require('../core/task');

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify(body));
}

function notFound(res) {
  json(res, 404, { error: 'not found' });
}

async function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8');
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch (e) {
        reject(new Error('invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

async function handle(req, res, url) {
  const { pathname, searchParams } = url;

  if (req.method === 'GET' && pathname === '/health') {
    return json(res, 200, { ok: true });
  }

  if (req.method === 'GET' && pathname === '/tasks') {
    const filter = {};
    if (searchParams.has('done')) filter.done = searchParams.get('done') === 'true';
    if (searchParams.has('tag')) filter.tag = searchParams.get('tag');
    if (searchParams.has('priority')) filter.priority = searchParams.get('priority');
    return json(res, 200, task.listTasks(filter));
  }

  if (req.method === 'POST' && pathname === '/tasks') {
    try {
      const body = await readBody(req);
      const created = task.addTask(body);
      return json(res, 201, created);
    } catch (e) {
      return json(res, 400, { error: e.message });
    }
  }

  const taskMatch = pathname.match(/^\/tasks\/(\d+)$/);
  if (taskMatch) {
    const id = Number(taskMatch[1]);
    if (req.method === 'GET') {
      const t = task.findTask(id);
      return t ? json(res, 200, t) : notFound(res);
    }
    if (req.method === 'POST' && url.pathname.endsWith('/done')) {
      const t = task.completeTask(id);
      return t ? json(res, 200, t) : notFound(res);
    }
    if (req.method === 'DELETE') {
      const ok = task.removeTask(id);
      return ok ? json(res, 204, '') : notFound(res);
    }
  }

  if (req.method === 'POST' && /^\/tasks\/\d+\/done$/.test(pathname)) {
    const id = Number(pathname.split('/')[2]);
    const t = task.completeTask(id);
    return t ? json(res, 200, t) : notFound(res);
  }

  if (req.method === 'GET' && pathname === '/stats') {
    return json(res, 200, task.statsTasks());
  }

  return notFound(res);
}

module.exports = { handle };
