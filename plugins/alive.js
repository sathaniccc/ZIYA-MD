module.exports = {
  command: 'alive',
  desc: 'Show alive',
  run: async ({ sock, msg, config }) => {
    const jid = msg.key.remoteJid;
    await sock.safeSend(jid, { text: `Ziya is online ✅\nOwner: ${config.ownerNumber}` });
  }
};
