const express = require("express");
const http = require("http");
const path = require("path");

const app = express();
const port = 3000;
const server = http.createServer(app); // Create HTTP server
const { Server } = require("socket.io");
const io = new Server(server); // Attach Socket.IO to the HTTP server

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("message", (msg) => {
    console.log("message: " + msg); // Log incoming message
    io.emit("message", msg); // Broadcast to all connected clients
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  }); 
});

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "public", "index.html"));
});
server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
