const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const path = require('path');
const dbFile = path.join(process.cwd(), 'data.json');
const adapter = new JSONFile(dbFile);
const db = new Low(adapter);

async function init() {
  await db.read();
  db.data = db.data || { users: {}, settings: {} };
  await db.write();
}

async function get(key) {
  await db.read();
  return db.data[key];
}

async function set(key, value) {
  await db.read();
  db.data[key] = value;
  await db.write();
}

init();

module.exports = { get, set, db };
