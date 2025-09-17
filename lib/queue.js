const PQueue = require('p-queue');
const queue = new PQueue({ concurrency: 1, intervalCap: 5, interval: 1000 });

async function enqueueSend(fn) {
  return queue.add(fn);
}

module.exports = { enqueueSend, queue };
