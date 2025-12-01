const express = require("express");
const path = require("path");
const fs = require("fs");
const logRequest = require("./middleware/logRequest");
const utilsRoutes = require("./routes/utils");

const app = express();
const PORT = 3000;

// Create logs folder if missing
const logDir = path.join(__dirname, "logs");
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

// Middleware
app.use(logRequest);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Test route
app.get("/", (req, res) => {
  res.json({ message: "ExpressJS Course Project Running" });
});

// Routes
app.use("/utils", utilsRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
