export const TIPOS_ATENDIEMNTO = {
  1: "Pagamento de mensalidade de esporte",
  2: "Pagamento de associação",
  3: "Matrícula do esporte",
  4: "Se associar",
  5: "Informação",
  6: "Outros",
} as const;

export type TipoAtendimento =  1 | 2 | 3 | 4 | 5 | 6;
export type StatusAtendimento = "pending" | "finished";

export function isTipoAtendimento(value: unknown): value is TipoAtendimento {
    return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value >= 1 &&
    value <= 6
  );
}