const express = require("express");
const http = require("http");
const cors = require("cors");
const db = require("./db");
const { setupWebSocket } = require("./websocket");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/data", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM biodegradability_data");
    res.json(results);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/insert-data", async (req, res) => {
  const { rate } = req.body;

  try {
    const [result] = await db.query(
      "INSERT INTO biodegradability_data (time, rate) VALUES (NOW(), ?)",
      [rate]
    );
    res
      .status(200)
      .json({ message: "Data inserted successfully", id: result.insertId });
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).json({ error: err.message });
  }
});

// Fetch all Real-Time Data Endpoint
app.get("/api/realtime-data", async (req, res) => {
  try {
    const [results] = await db.query(
      "SELECT * FROM biodegradability_data ORDER BY time ASC"
    );
    res.json(results);
  } catch (err) {
    console.error("Error fetching real-time data:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

const server = http.createServer(app);

setupWebSocket(server);

// Start the server
server.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
