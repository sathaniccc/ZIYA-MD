module.exports = {
  prefix: process.env.PREFIX || '.',
  ownerNumber: process.env.OWNER_NUMBER || '919xxxxxxxxx',
  sessionPath: process.env.SESSION_PATH || './sessions/ziya-auth',
  port: process.env.PORT || 3000,
  watchMode: process.env.WATCH_MODE === 'true'
};
