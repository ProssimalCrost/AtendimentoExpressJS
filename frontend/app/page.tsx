import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow text-center space-y-4">
        <h1 className="text-2xl font-bold">
          Sistema de Atendimentos
        </h1>

        <p className="text-gray-500">
          Sistema interno de controle de fila em tempo real
        </p>

        <Link
          href="/atendimentos"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Acessar sistema
        </Link>
      </div>
    </main>
  );
}
