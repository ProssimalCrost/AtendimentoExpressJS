import { io } from "socket.io-client";

const socket = io("https://atendimento-express.vercel.app");

socket.on("attendance:new", (data) => {
  console.log("Novo atendimento:", data);
});

socket.on("attendance:finished", (data) => {
  console.log("Atendimento finalizado:", data);
});
