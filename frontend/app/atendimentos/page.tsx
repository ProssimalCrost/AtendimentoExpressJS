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
  const [pendentes, setPendentes] = useState<Atendimento[]>([]);
  const [finalizados, setFinalizados] = useState<Atendimento[]>([]);

  useEffect(() => {
    // 🔹 1. Buscar estado inicial via REST
    fetch("http://localhost:3333/atendimentos")
      .then((res) => res.json())
      .then((data: Atendimento[]) => {
        setPendentes(data.filter((a) => a.status === "pending"));
        setFinalizados(data.filter((a) => a.status === "finished"));
      });

    // 🔹 2. Conectar no socket
    socket.connect();

    socket.on("connect", () => {
        console.log("Socket conectado:", socket.id)
    })

    // 🔹 3. Novo atendimento (sempre pendente)
    socket.on("attendance:new", (data: Atendimento) => {
      setPendentes((prev) => [...prev, data]);
    });

    // 🔹 4. Atendimento finalizado → mover de lista
    socket.on("attendance:finished", ({ id }: { id: string }) => 
        {
        console.log("Evento attendance:finished recebido:", id);
            

      setPendentes((prevPendentes) => {
        const atendimento = prevPendentes.find((a) => a.id === id);
        if (!atendimento) return prevPendentes;

        setFinalizados((prevFinalizados) => [
          ...prevFinalizados,
          { ...atendimento, status: "finished" },
        ]);

        return prevPendentes.filter((a) => a.id !== id);
      });
    });

    // 🔹 5. Cleanup
    return () => {
      socket.off("attendance:new");
      socket.off("attendance:finished");
      socket.disconnect();
    };
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1> Fila de Atendimentos</h1>

      {/* ================= PENDENTES ================= */}
      <section style={{ marginTop: 32 }}>
        <h2> Atendimentos Pendentes ({pendentes.length})</h2>

        {pendentes.length === 0 ? (
          <p>Nenhum atendimento pendente.</p>
        ) : (
          <ul>
            {pendentes.map((a) => (
              <li key={a.id} style={{ marginBottom: 8 }}>
                <strong>{a.name}</strong>
                {a.description && ` — ${a.description}`}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ================= FINALIZADOS ================= */}
      <section style={{ marginTop: 32 }}>
        <h2> Atendimentos Finalizados ({finalizados.length})</h2>

        {finalizados.length === 0 ? (
          <p>Nenhum atendimento finalizado.</p>
        ) : (
          <ul>
            {finalizados.map((a) => (
              <li key={a.id} style={{ marginBottom: 8 }}>
                <strong>{a.name}</strong>
                {a.description && ` — ${a.description}`}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
