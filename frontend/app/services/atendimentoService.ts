export async function loadAtendimentos() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/atendimentos`
  );

  if (!response.ok) {
    throw new Error("Erro ao carregar atendimentos");
  }

  return response.json();
}