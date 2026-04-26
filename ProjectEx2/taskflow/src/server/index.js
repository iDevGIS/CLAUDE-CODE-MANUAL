const http = require('http');
const { handle } = require('./routes');

function createServer() {
  return http.createServer(async (req, res) => {
    const url = new URL(req.url, 'http://localhost');
    try {
      await handle(req, res, url);
    } catch (e) {
      res.statusCode = 500;
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify({ error: e.message }));
    }
  });
}

if (require.main === module) {
  const port = Number(process.env.TASKFLOW_PORT) || 3000;
  createServer().listen(port, () => {
    console.log(`taskflow server listening on http://localhost:${port}`);
  });
}

module.exports = { createServer };
