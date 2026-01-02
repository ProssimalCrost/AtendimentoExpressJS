"use client";

import { useEffect, useState } from "react";


interface Atendimento {
  id: string;
  name: string;
  description: string | null;
  status: "pending" | "finished";
}

export default function AtendimentosPage() {
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}`)
      .then((res) => res.json())
      .then((data) => setAtendimentos(data));
      console.log("🔌 Conectando socket...");

  async function loadAtendimentos() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/atendimentos"
  );
  const data = await res.json();
  setAtendimentos(data);
}
},[]); 
  
  const pendentes = atendimentos.filter(a => a.status === "pending");
  const finalizados = atendimentos.filter(a => a.status === "finished");

  async function finalizarAtendimento(id: string) {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${id}/finish`,
      {
      method: "PATCH",
    });
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
        Sistema de Atendimentos
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* PENDENTES */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-yellow-600">
             Pendentes ({pendentes.length})
          </h2>

          <ul className="space-y-4">
            {pendentes.map((a) => (
              <li
                key={a.id}
                className="border rounded-lg p-4 flex justify-between items-start"
              >
                <div>
                  <p className="font-medium text-blue-600">{a.name}</p>
                  {a.description && (
                    <p className="text-sm text-gray-500">
                      {a.description}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => finalizarAtendimento(a.id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md text-sm"
                >
                  Finalizar
                </button>
              </li>
            ))}

            {pendentes.length === 0 && (
              <p className="text-sm text-gray-400">
                Nenhum atendimento pendente
              </p>
            )}
          </ul>
        </section>

        {/* FINALIZADOS */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-green-600">
             Finalizados ({finalizados.length})
          </h2>

          <ul className="space-y-4">
            {finalizados.map((a) => (
              <li
                key={a.id}
                className="border rounded-lg p-4 bg-green-50"
              >
                <p className="font-medium text-green-600">{a.name}</p>
                {a.description && (
                  <p className="text-sm text-gray-500">
                    {a.description}
                  </p>
                )}
              </li>
            ))}

            {finalizados.length === 0 && (
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