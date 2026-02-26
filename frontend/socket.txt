import { Server as IOServer } from "socket.io";

let io: IOServer;

export const initSocket = (server: any) => {
  io = new IOServer(server, {
    cors: { origin: "*" },
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io não inicializado");
  }
  return io;
};
