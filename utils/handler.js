const fs = require('fs');
const path = require('path');
const config = require('../config');
const pluginsDir = path.join(__dirname, '..', 'plugins');
let plugins = {};

function loadPlugins() {
  plugins = {};
  fs.readdirSync(pluginsDir).forEach(file => {
    if (file.endsWith('.js')) {
      try {
        delete require.cache[require.resolve(path.join(pluginsDir, file))];
        const mod = require(path.join(pluginsDir, file));
        if (mod && mod.command) plugins[mod.command] = mod;
      } catch (e) {
        console.error('Failed load plugin', file, e);
      }
    }
  });
}
loadPlugins();
if (process.env.WATCH_MODE === 'true') {
  fs.watch(pluginsDir, () => loadPlugins());
}

async function handle(sock, msg) {
  const message = msg.message;
  if (!message) return;
  const jid = msg.key.remoteJid;
  const sender = msg.key.participant || msg.key.remoteJid;
  let text = '';
  if (message.conversation) text = message.conversation;
  else if (message.extendedTextMessage && message.extendedTextMessage.text) text = message.extendedTextMessage.text;
  else return;

  if (!text.startsWith(config.prefix)) return;

  const args = text.trim().split(/\s+/);
  const cmd = args[0].slice(config.prefix.length).toLowerCase();

  const plugin = plugins[cmd];
  if (!plugin) {
    return sock.safeSend(jid, { text: 'Unknown command. Use ' + config.prefix + 'menu' });
  }

  try {
    await plugin.run({ sock, msg, args, config, plugins: Object.values(plugins) });
  } catch (e) {
    console.error('Plugin run error', e);
    await sock.safeSend(jid, { text: 'Internal error running command.' });
  }
}

module.exports = handle;
