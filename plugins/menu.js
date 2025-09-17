const os = require('os');
const moment = require('moment');

module.exports = {
  command: 'menu',
  desc: 'Show menu',
  run: async ({ sock, msg, config, plugins }) => {
    const jid = msg.key.remoteJid;
    const uptime = moment.duration(process.uptime(), 'seconds').humanize();
    const totalPlugins = plugins.length;
    const menuText = `
┌───『 Ziya Bot 』───┐
│ Device: ${os.type()} ${os.release()}
│ Uptime: ${uptime}
│ Plugins: ${totalPlugins}
│ Owner: ${config.ownerNumber}
└───────────────────┘

Available Commands
.menu
.alive
.ping
.tts <text>
.uptime
.deviceinfo
`;
    await sock.safeSend(jid, { text: menuText });
  }
};
