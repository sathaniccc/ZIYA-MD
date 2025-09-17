const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
let start = Date.now();

app.get('/', (req, res) => res.send('Ziya is running'));
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime_seconds: Math.floor((Date.now()-start)/1000) });
});

app.listen(port, () => console.log('HTTP server listening on', port));
module.exports = app;
