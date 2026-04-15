const { Pool } = require("pg");
const ExcelJS = require("exceljs");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

function isLastDayOfMonth(date = new Date()) {
  const tomorrow = new Date(date);
  tomorrow.setDate(date.getDate() + 1);
  return tomorrow.getMonth() !== date.getMonth();
}

function getMonthRange(date = new Date()) {
  const start = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 1, 0, 0, 0, 0);
  return { start, end };
}

function formatDateFile(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

function tipoLabel(tipo) {
  const mapa = {
    1: "Pagamento de mensalidade de esporte",
    2: "Pagamento de associação",
    3: "Matrícula do esporte",
    4: "Se associar",
    5: "Informação",
    6: "Outros",
  };

  return mapa[tipo] || `Tipo ${tipo}`;
}

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

async function main() {
  if (!isLastDayOfMonth()) {
    console.log("Hoje não é o último dia do mês. Encerrando sem executar.");
    process.exit(0);
  }

  const {
    NEON_DATABASE_URL,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    MAIL_FROM,
    MAIL_TO,
  } = process.env;

  if (!NEON_DATABASE_URL) {
    throw new Error("NEON_DATABASE_URL não configurada.");
  }

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !MAIL_FROM || !MAIL_TO) {
    throw new Error("Credenciais SMTP incompletas.");
  }

  const pool = new Pool({
    connectionString: NEON_DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  const client = await pool.connect();

  try {
    const now = new Date();
    const { start, end } = getMonthRange(now);

    console.log(`Gerando relatório de ${start.toISOString()} até ${end.toISOString()}`);

    // Ajustado para sua tabela atendimentos com variações comuns de nomes de colunas
    const detalhadoQuery = `
      SELECT
        id,
        tipo,
        status,
        COALESCE(created_at, "createdAt") AS created_at
      FROM atendimentos
      WHERE COALESCE(created_at, "createdAt") >= $1
        AND COALESCE(created_at, "createdAt") < $2
      ORDER BY COALESCE(created_at, "createdAt") ASC
    `;

    const resumoTipoQuery = `
      SELECT
        tipo,
        COUNT(*)::int AS total
      FROM atendimentos
      WHERE COALESCE(created_at, "createdAt") >= $1
        AND COALESCE(created_at, "createdAt") < $2
      GROUP BY tipo
      ORDER BY tipo
    `;

    const resumoStatusQuery = `
      SELECT
        status,
        COUNT(*)::int AS total
      FROM atendimentos
      WHERE COALESCE(created_at, "createdAt") >= $1
        AND COALESCE(created_at, "createdAt") < $2
      GROUP BY status
      ORDER BY status
    `;

    const totalQuery = `
      SELECT COUNT(*)::int AS total
      FROM atendimentos
      WHERE COALESCE(created_at, "createdAt") >= $1
        AND COALESCE(created_at, "createdAt") < $2
    `;

    const [detalhado, resumoTipo, resumoStatus, total] = await Promise.all([
      client.query(detalhadoQuery, [start, end]),
      client.query(resumoTipoQuery, [start, end]),
      client.query(resumoStatusQuery, [start, end]),
      client.query(totalQuery, [start, end]),
    ]);

    const reportsDir = path.join(process.cwd(), "reports");
    await ensureDir(reportsDir);

    const fileName = `relatorio-atendimento-express-${formatDateFile(now)}.xlsx`;
    const filePath = path.join(reportsDir, fileName);

    const workbook = new ExcelJS.Workbook();
    workbook.creator = "GitHub Actions";
    workbook.created = new Date();

    // Aba Resumo
    const wsResumo = workbook.addWorksheet("Resumo");
    wsResumo.columns = [
      { header: "Métrica", key: "metrica", width: 35 },
      { header: "Valor", key: "valor", width: 20 },
    ];

    wsResumo.addRow({ metrica: "Mês de referência", valor: formatDateFile(now) });
    wsResumo.addRow({ metrica: "Total de atendimentos", valor: total.rows[0]?.total || 0 });
    wsResumo.addRow({ metrica: "Período início", valor: start.toLocaleString("pt-BR") });
    wsResumo.addRow({ metrica: "Período fim", valor: end.toLocaleString("pt-BR") });

    wsResumo.addRow({});
    wsResumo.addRow({ metrica: "Resumo por status", valor: "" });

    resumoStatus.rows.forEach((row) => {
      wsResumo.addRow({
        metrica: `Status: ${row.status}`,
        valor: row.total,
      });
    });

    wsResumo.addRow({});
    wsResumo.addRow({ metrica: "Resumo por tipo", valor: "" });

    resumoTipo.rows.forEach((row) => {
      wsResumo.addRow({
        metrica: tipoLabel(row.tipo),
        valor: row.total,
      });
    });

    // Aba detalhada
    const wsDetalhes = workbook.addWorksheet("Detalhes");
    wsDetalhes.columns = [
      { header: "ID", key: "id", width: 40 },
      { header: "Tipo", key: "tipo", width: 12 },
      { header: "Descrição do tipo", key: "tipoDescricao", width: 35 },
      { header: "Status", key: "status", width: 20 },
      { header: "Criado em", key: "created_at", width: 25 },
    ];

    detalhado.rows.forEach((row) => {
      wsDetalhes.addRow({
        id: row.id,
        tipo: row.tipo,
        tipoDescricao: tipoLabel(row.tipo),
        status: row.status,
        created_at: new Date(row.created_at).toLocaleString("pt-BR"),
      });
    });

    await workbook.xlsx.writeFile(filePath);
    console.log(`Relatório salvo em: ${filePath}`);

    // Enviar por e-mail
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: MAIL_FROM,
      to: MAIL_TO,
      subject: `Relatório mensal - Atendimento Express - ${formatDateFile(now)}`,
      text:
        `Segue em anexo o relatório mensal do Atendimento Express (${formatDateFile(now)}).\n\n` +
        `Total de atendimentos no mês: ${total.rows[0]?.total || 0}\n` +
        `Após o envio, foi realizada a limpeza dos registros do mês processado.`,
      attachments: [
        {
          filename: fileName,
          path: filePath,
        },
      ],
    });

    console.log(`E-mail enviado para ${MAIL_TO}`);

    // Limpeza do mês já relatado
    const deleteQuery = `
      DELETE FROM atendimentos
      WHERE COALESCE(created_at, "createdAt") >= $1
        AND COALESCE(created_at, "createdAt") < $2
    `;

    const deleted = await client.query(deleteQuery, [start, end]);
    console.log(`Registros removidos: ${deleted.rowCount}`);
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((err) => {
  console.error("Erro na rotina mensal:", err);
  process.exit(1);
});
