import { io } from "socket.io-client";

export const socket = io(
  process.env.NEXT_PUBLIC_SOCKET_URL!,
  {
    transports: ["websocket"], // 🔥 OBRIGATÓRIO
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  }
);
// Verificar se ultiliza o socket