const { startBot } = require('./lib/bot');
const { handle } = require('./utils/handler');
const config = require('./config');
require('./server');

(async () => {
  try {
    const sock = await startBot((sock, msg) => handle(sock, msg, config));
    console.log('Ziya started. Prefix:', config.prefix);
  } catch (e) {
    console.error('Failed to start Ziya:', e);
    process.exit(1);
  }
})();



// ========== QR Web Interface ==========
const express = require("express");
const qrcode = require("qrcode");

sock.ev.on("connection.update", async ({ qr, connection }) => {
  if (qr) {
    console.log("📌 Scan QR from web link /qr");
    await qrcode.toFile("qr.png", qr); // Save QR as file
  }
  if (connection === "open") {
    console.log("✅ Ziya Bot connected!");
  }
});

// Start Express server for QR
const app = express();
app.get("/qr", (req, res) => {
  res.sendFile(path.join(__dirname, "qr.png"));
});
app.listen(process.env.PORT || 3000, () => {
  console.log("🌐 QR Web Server running...");
});
// ======================================
