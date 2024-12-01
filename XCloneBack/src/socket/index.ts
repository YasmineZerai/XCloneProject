import { Server } from "socket.io";
import { Server as HTTPServer } from "node:http";
export function setUpSocketServer(s: HTTPServer) {
  const io = new Server(s);
  io.on("connection", (socket) => {
    io.emit("hello");
  });
}
