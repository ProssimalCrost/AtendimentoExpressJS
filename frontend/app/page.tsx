import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-15 rounded-xl shadow w-full max-w-xl space-y-6 text-center">
        <h1 className="text-4xl font-bold text-black">
          Sistema de Atendimentos
        </h1>

        <p className="text-gray-500 text-2xl">
          Selecione o tipo de acesso
        </p>

        <div className="flex flex-col gap-4">
          <Link
            href="/porteiro"
            className="bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 text-2xl"
          >
            Registrar Atendimento
          </Link>

          <Link
            href="/atendimento"
            className="bg-gray-800 text-white py-3 rounded-md hover:bg-gray-900 text-2xl"
          >
            Gestão de Atendimentos
          </Link>
        </div>
      </div>
    </main>
  );
}
