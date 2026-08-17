"use client";

import { useEffect, useRef, useState } from "react";
import { notifyNewAtendimento } from "@/utils/notify";

interface Atendimento {
  id: string;
  tipo: number;
  tipoLabel: string;
  status: "pending" | "finished";
  created_at?: string;
}

export default function AtendimentosPage() {
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);
  const lastCountRef = useRef(0);
  const firstLoadRef = useRef(true);

  async function loadAtendimentos() {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        console.error("NEXT_PUBLIC_API_URL não está definida");
        return;
      }

      const res = await fetch(`${apiUrl}/atendimentos`, {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`Erro na API: ${res.status}`);
      }

      const text = await res.text();

      if (!text.trim()) {
        setAtendimentos([]);
        lastCountRef.current = 0;
        firstLoadRef.current = false;
        return;
      }

      const data = JSON.parse(text);
      console.log("Atendimentos carregados:", data);

      const lista: Atendimento[] = Array.isArray(data) ? data : [];

      const pendentesNovos = lista.filter(
        (atendimento) => atendimento.status === "pending"
      ).length;

      if (!firstLoadRef.current && pendentesNovos > lastCountRef.current) {
        notifyNewAtendimento();
      }

      setAtendimentos(lista);
      lastCountRef.current = pendentesNovos;
      firstLoadRef.current = false;
    } catch (error) {
      console.error("Erro ao carregar atendimentos:", error);
    }
  }

  useEffect(() => {
    loadAtendimentos();

    const interval = setInterval(() => {
      loadAtendimentos();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  async function finalizarAtendimento(id: string) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/atendimentos";

      if (!apiUrl) {
        console.error("NEXT_PUBLIC_API_URL não está definida");
        return;
      }

      const res = await fetch(`${apiUrl}/${id}/finish`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Erro ao finalizar atendimento: ${res.status}`);
      }

      await loadAtendimentos();
    } catch (error) {
      console.error("Erro ao finalizar atendimento:", error);
    }
  }

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  const pendentes = atendimentos.filter(
    (atendimento) => atendimento.status === "pending"
  );

  const finalizados = atendimentos.filter(
    (atendimento) => atendimento.status === "finished"
  );

  return (
    <main className="min-h-screen p-8 bg-blue-80 bg-center bg-cover bg-no-repeat">
      <h1 className="mb-8 text-center text-3xl font-bold text-black">
        Sistema de Atendimentos
      </h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <section className="rounded-xl bg-white p-8 shadow-xl">
          <h2 className="mb-4 text-xl font-semibold text-yellow-600">
            Pendentes ({pendentes.length})
          </h2>

          <ul className="space-y-4">
            {pendentes.length > 0 ? (
              pendentes.map((atendimento) => (
                <li
                  key={atendimento.id}
                  className="flex items-start justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="font-medium text-blue-600">
                      {atendimento.tipo}. {atendimento.tipoLabel}
                    </p>
                  </div>

                  <button
                    onClick={() => finalizarAtendimento(atendimento.id)}
                    className="rounded-md bg-green-500 px-4 py-1 text-sm text-white hover:bg-green-600"
                  >
                    Finalizar
                  </button>
                </li>
              ))
            ) : (
              <p className="text-sm text-gray-400">
                Nenhum atendimento pendente
              </p>
            )}
          </ul>
        </section>

        <section className="rounded-xl bg-white p-8 shadow-xl">
          <h2 className="mb-4 text-xl font-semibold text-green-600">
            Finalizados ({finalizados.length})
          </h2>

          <ul className="space-y-4">
            {finalizados.length > 0 ? (
              finalizados.map((atendimento) => (
                <li
                  key={atendimento.id}
                  className="rounded-lg border bg-green-50 p-4"
                >
                  <p className="font-medium text-green-600">
                    {atendimento.tipo}. {atendimento.tipoLabel}
                  </p>
                </li>
              ))
            ) : (
              <p className="text-sm text-gray-400">
                Nenhum atendimento finalizado
              </p>
            )}
          </ul>
        </section>
      </div>
    </main>
  );
}