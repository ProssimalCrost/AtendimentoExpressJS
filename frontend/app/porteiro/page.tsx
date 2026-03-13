"use client";

import { useState, useEffect } from "react";

const tiposAtendimento = [
  { id: 1, label: "Pagamento de mensalidade de esporte" },
  { id: 2, label: "Pagamento de associação" },
  { id: 3, label: "Matrícula do esporte" },
  { id: 4, label: "Se associar" },
  { id: 5, label: "Informação" },
  { id: 6, label: "Outros" },
];

export default function SolicitarAtendimentoPage() {
  const [loadingTipo, setLoadingTipo] = useState<number | null>(null);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  async function criarAtendimento(tipo: number) {
    try {
      setLoadingTipo(tipo);
      setMensagem("");
      setErro("");

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        throw new Error("NEXT_PUBLIC_API_URL não está definida");
      }

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tipo }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Erro ao criar atendimento");
      }

      setMensagem(data?.message || "Atendimento criado com sucesso");
    } catch (error) {
      console.error("Erro ao criar atendimento:", error);
      setErro("Não foi possível criar o atendimento");
    } finally {
      setLoadingTipo(null);
    }
  }

  // ✅ Escuta teclas 1–6 do teclado
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Bloqueia se já tem um atendimento em andamento
      if (loadingTipo !== null) return;

      const num = parseInt(e.key);
      if (num >= 1 && num <= 6) {
        criarAtendimento(num);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [loadingTipo]); // re-registra quando loadingTipo muda

  return (
    <main className="min-h-screen bg-[url('/images/bg1.png')] bg-center bg-cover bg-no-repeat p-6">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-2xl">
        <h1 className="mb-2 text-center text-3xl font-bold text-blue-700">
          Atendimento Express
        </h1>

        <p className="mb-8 text-center text-gray-600">
          Selecione o tipo de atendimento ou pressione{" "}
          <span className="font-semibold text-blue-600">1 a 6</span> no teclado
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {tiposAtendimento.map((tipo) => (
            <button
              key={tipo.id}
              onClick={() => criarAtendimento(tipo.id)}
              disabled={loadingTipo !== null}
              className={`rounded-xl border p-5 text-left transition disabled:cursor-not-allowed disabled:opacity-70 ${
                loadingTipo === tipo.id
                  ? "border-blue-500 bg-blue-200"
                  : "border-blue-200 bg-blue-50 hover:bg-blue-100"
              }`}
            >
              <span className="block text-sm font-medium text-blue-500">
                [{tipo.id}] Opção {tipo.id}
              </span>
              <span className="mt-1 block text-base font-semibold text-blue-700">
                {tipo.label}
              </span>
            </button>
          ))}
        </div>

        {mensagem && (
          <div className="mt-6 rounded-lg bg-green-100 p-4 text-green-700">
            ✅ {mensagem}
          </div>
        )}

        {erro && (
          <div className="mt-6 rounded-lg bg-red-100 p-4 text-red-700">
            ❌ {erro}
          </div>
        )}
      </div>
    </main>
  );
}