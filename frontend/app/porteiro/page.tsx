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
///atendimentos
    try {
    const res =
     await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, 
      {
        mode: "no-cors",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description: description || null }),
      }
    );
   console.log("API:", process.env.NEXT_PUBLIC_API_URL);

  /*  if (!res.ok) {
      throw new Error("Erro ao salvar atendimento");
    }*/

    setName("");
    setDescription("");
  /* }  catch (err) {
    alert("Erro ao salvar. Tente novamente.");
    console.error(err); */
  } finally {
    setLoading(false); // 🔑 SEMPRE EXECUTA
  }
}

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-200">
      <form
        onSubmit={criarAtendimento}
        className="bg-white p-8 rounded-xl shadow w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-black">
          Registrar Atendimento
        </h1>

        <input
          type="text"
          placeholder="Nome do cliente"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-2 text-gray-600"
        />

        <input
          type="text"
          placeholder="Descrição (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded px-3 py-2 text-gray-600"
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Salvando..." : "Adicionar"}
        </button>
      </form>
    </main>
  );
}
