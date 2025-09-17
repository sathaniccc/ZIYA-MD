const moment = require('moment');
module.exports = {
  command: 'uptime',
  desc: 'Bot uptime',
  run: async ({ sock, msg }) => {
    const jid = msg.key.remoteJid;
    const up = process.uptime();
    const human = moment.duration(up, 'seconds').humanize();
    await sock.safeSend(jid, { text: `Uptime: ${human}` });
  }
};
