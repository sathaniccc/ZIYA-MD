const os = require('os');
module.exports = {
  command: 'deviceinfo',
  desc: 'Show device info',
  run: async ({ sock, msg }) => {
    const jid = msg.key.remoteJid;
    const info = `Device Info:\nPlatform: ${os.platform()}\nArch: ${os.arch()}\nCPU: ${os.cpus().length} cores`;
    await sock.safeSend(jid, { text: info });
  }
};
