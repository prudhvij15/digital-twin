const WebSocket = require("ws");
const db = require("./db");

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log("Client connected via WebSocket");

    // Send real-time updates every 5 seconds
    const interval = setInterval(async () => {
      try {
        const [newData] = await db.query(
          "SELECT * FROM biodegradability_data ORDER BY id DESC LIMIT 1"
        );
        console.log("Sending data:", newData);
        ws.send(JSON.stringify(newData[0]));
      } catch (err) {
        console.error("Error fetching real-time data:", err);
      }
    }, 1000);

    ws.on("close", () => {
      console.log("Client disconnected");
      clearInterval(interval);
    });
  });

  console.log("WebSocket server setup complete");
}

module.exports = { setupWebSocket };
