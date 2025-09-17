const { parentPort, workerData } = require('worker_threads');
const gtts = require('google-tts-api');

(async () => {
  try {
    const url = gtts.getAudioUrl(workerData.text, { lang: workerData.lang || 'en', slow: false });
    parentPort.postMessage({ url });
  } catch (e) {
    parentPort.postMessage({ error: e.message });
  }
})();
