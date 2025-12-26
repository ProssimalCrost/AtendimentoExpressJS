import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow w-full max-w-md space-y-6 text-center">
        <h1 className="text-2xl font-bold">
          Sistema de Atendimentos
        </h1>

        <p className="text-gray-500">
          Selecione o tipo de acesso
        </p>

        <div className="flex flex-col gap-4">
          <Link
            href="/porteiro"
            className="bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
          >
            Acesso Porteiro
          </Link>

          <Link
            href="/admin"
            className="bg-gray-800 text-white py-3 rounded-md hover:bg-gray-900"
          >
            Acesso Administrativo
          </Link>
        </div>
      </div>
    </main>
  );
}
