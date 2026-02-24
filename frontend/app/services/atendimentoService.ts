export async function loadAtendimentos() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}`
  );

 if (!response.ok) return;

const text = await response.text();

if (!text) return;

const data = JSON.parse(text);
}