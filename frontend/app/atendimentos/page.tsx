"use client";

import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";

interface Atendimento {
  id: string;
  name: string;
  description: string | null;
  status: "pending" | "finished";
}

export default function AtendimentosPage() {
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);

  useEffect(() => {
    fetch("http://localhost:3333/atendimentos")
      .then((res) => res.json())
      .then((data) => setAtendimentos(data));

    socket.connect();

    socket.on("attendance:new", (data: Atendimento) => {
      setAtendimentos((prev) => [...prev, data]);
    });

    socket.on("attendance:finished", ({ id }: { id: string }) => {
      setAtendimentos((prev) =>
        prev.map((a) =>
          a.id === id ? { ...a, status: "finished" } : a
        )
      );
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, []);

  const pendentes = atendimentos.filter(a => a.status === "pending");
  const finalizados = atendimentos.filter(a => a.status === "finished");

  return (
    <main style={{ padding: 20 }}>
      <h1>Fila de Atendimentos</h1>

      <h2>🟡 Pendentes</h2>
      <ul>
        {pendentes.map((a) => (
          <li key={a.id}>
            <strong>{a.name}</strong>
            {a.description && ` — ${a.description}`}
          </li>
        ))}
      </ul>

      <h2>✅ Finalizados</h2>
      <ul>
        {finalizados.map((a) => (
          <li key={a.id}>
            <strong>{a.name}</strong>
            {a.description && ` — ${a.description}`}
          </li>
        ))}
      </ul>
    </main>
  );
}
