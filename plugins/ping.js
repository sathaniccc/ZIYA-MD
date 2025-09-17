module.exports = {
  command: 'ping',
  desc: 'Ping',
  run: async ({ sock, msg }) => {
    const jid = msg.key.remoteJid;
    const t1 = Date.now();
    await sock.safeSend(jid, { text: 'Pong' });
    const t2 = Date.now();
    await sock.safeSend(jid, { text: `Latency: ${t2 - t1}ms` });
  }
};
