const fs = require('fs');
const os = require('os');
const path = require('path');

function tmpDb(label = 'taskflow-test') {
  const file = path.join(os.tmpdir(), `${label}-${process.pid}-${Date.now()}-${Math.random().toString(36).slice(2)}.json`);
  return {
    path: file,
    cleanup() {
      try {
        fs.unlinkSync(file);
      } catch {}
    },
  };
}

module.exports = { tmpDb };
