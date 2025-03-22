import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, "dist")));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const PORT = process.argv?.[2] || 8080;

console.log("arguments : ", process.argv);

server.listen(PORT, () => {
  console.log("devtools is running in PORT : ", PORT);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "/index.html"));
});

io.on("connection", (socket) => {
  console.log("connected...");

  socket.on("storeListChange", (e) => {
    console.log("store list changed ...");

    socket.broadcast.emit("storeListChange", e);
  });

  socket.on("storeStateChange", (e) => {
    console.log("store state changed ...");

    socket.broadcast.emit("storeStateChange", e);
  });

  socket.on("storeSubscribe", (e) => {
    console.log("store storeSubscribe ...");

    socket.broadcast.emit("storeSubscribe", e);
  });

  socket.on("storeUnsubscribe", (e) => {
    console.log("store storeUnsubscribe ...");

    socket.broadcast.emit("storeUnsubscribe", e);
  });

  socket.on("storeObserved", (e) => {
    console.log("store storeObserved ...");

    socket.broadcast.emit("storeObserved", e);
  });

  socket.on("storeUnobserved", (e) => {
    console.log("store storeUnobserved ...");

    socket.broadcast.emit("storeUnobserved", e);
  });
});
