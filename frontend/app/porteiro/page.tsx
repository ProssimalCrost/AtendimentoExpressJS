"use client";

import { useState } from "react";


export default function PorteiroPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function criarAtendimento(e: React.FormEvent) {
  e.preventDefault();
  if (!name.trim()) return;

  setLoading(true);

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description: description || null,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log("Resposta do backend:", data);

    setName("");
    setDescription("");
  } catch (error) {
    console.error("Erro ao criar atendimento:", error);
  } finally {
    setLoading(false);
  }
}


  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-200 bg-[url('/images/bg1.png')] bg-center bg-cover bg-no-repeat">
      <form
        onSubmit={criarAtendimento}
        className="bg-white p-12 rounded-xl shadow w-full max-w-md space-y-4"
      >
        <h1 className="text-3xl font-bold text-center text-black">
          Registrar Atendimento
        </h1>

        <input
          type="text"
          placeholder="Nome do cliente"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-5 text-gray-600"
        />

        <input
          type="text"
          placeholder="Descrição (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded px-3 py-5 text-gray-600"
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-5 rounded hover:bg-blue-700 text-lg"
        >
          {loading ? "Salvando..." : "Adicionar"}
        </button>
      </form>
    </main>
  );
}
