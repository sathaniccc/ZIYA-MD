module.exports = {
  prefix: process.env.PREFIX || '.',
  ownerNumber: process.env.OWNER_NUMBER || '918921016567',
  sessionPath: process.env.SESSION_PATH || './sessions/ziya-auth',
  port: process.env.PORT || 8000,
  watchMode: process.env.WATCH_MODE === 'true'
};
