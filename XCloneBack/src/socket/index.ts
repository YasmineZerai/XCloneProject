import { Server } from "socket.io";
import { Server as HTTPServer } from "node:http";
export function setUpSocketServer(s: HTTPServer) {
  const io = new Server(s);
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("private_message", ({ to, message }) => {
      io.to(to).emit("private_message", { from: socket.id, message });
    });
  });
}
