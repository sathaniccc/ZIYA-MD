const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, DisconnectReason } = require('baileys');
const P = require('pino');
const qrcode = require('qrcode-terminal');
const path = require('path');
const { enqueueSend } = require('./queue');

async function startBot(onMessage) {
  const sessionDir = path.join(process.env.SESSION_PATH || './sessions', 'ziya-auth');
  const { state, saveCreds } = await useMultiFileAuthState(sessionDir);
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    logger: P({ level: 'silent' }),
    printQRInTerminal: true,
    auth: state,
    version
  });

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update;
    if (qr) qrcode.generate(qr, { small: true });
    if (connection === 'close') {
      const code = lastDisconnect?.error?.output?.statusCode;
      console.log('connection closed', code);
      if (code !== DisconnectReason.loggedOut) startBot(onMessage);
    } else if (connection === 'open') {
      console.log('Ziya connected!');
    }
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('messages.upsert', async m => {
    try {
      const msg = m.messages[0];
      if (!msg) return;
      if (msg.key && msg.key.fromMe) return;
      // lightweight ack for quick response if ping-like
      onMessage && onMessage(sock, msg);
    } catch (e) {
      console.error('messages.upsert error', e);
    }
  });

  sock.safeSend = async (jid, message) => {
    return enqueueSend(() => sock.sendMessage(jid, message));
  };

  return sock;
}

module.exports = { startBot };
