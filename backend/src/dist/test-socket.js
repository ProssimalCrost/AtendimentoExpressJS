import { io } from "socket.io-client";
const socket = io("http://localhost:3000");
socket.on("attendance:new", (data) => {
    console.log("Novo atendimento:", data);
});
socket.on("attendance:finished", (data) => {
    console.log("Atendimento finalizado:", data);
});
//# sourceMappingURL=test-socket.js.map