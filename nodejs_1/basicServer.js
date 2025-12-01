const http = require("http");
const fs = require("fs");
const path = require("path");
const { writeLog } = require("./fileWriter");

const PORT = 6001;

const server = http.createServer((req, res) => {
  writeLog(`Request: ${req.method} ${req.url}`);

  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "NodeJS Core Server Running" }));
  }

  if (req.url === "/text") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    return res.end("NodeJS raw text response");
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Route Not Found");
});

server.listen(PORT, () => {
  console.log(`NodeJS server running at http://localhost:${PORT}`);
});
