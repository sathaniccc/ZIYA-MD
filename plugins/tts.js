const { Worker } = require('worker_threads');
module.exports = {
  command: 'tts',
  desc: 'Text to speech (TTS)',
  run: async ({ sock, msg, args }) => {
    const jid = msg.key.remoteJid;
    const text = args.slice(1).join(' ');
    if (!text) return sock.safeSend(jid, { text: 'Usage: .tts Hello world' });

    const worker = new Worker('./lib/workers/tts.worker.js', { workerData: { text, lang: 'en' } });
    worker.once('message', async (res) => {
      if (res.url) {
        await sock.safeSend(jid, { audio: { url: res.url }, mimetype: 'audio/mp3' });
      } else {
        await sock.safeSend(jid, { text: 'TTS failed' });
      }
      worker.terminate();
    });
    worker.once('error', async (err) => {
      console.error('TTS worker error', err);
      await sock.safeSend(jid, { text: 'TTS error' });
    });
  }
};
