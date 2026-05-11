import { Pool } from "pg";

export const runtime = "nodejs";

type AppointmentPayload = {
  fullName?: unknown;
  phone?: unknown;
  email?: unknown;
  organization?: unknown;
  preferredDate?: unknown;
  preferredTime?: unknown;
  message?: unknown;
};

function normalizeText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isValidTime(value: string) {
  return /^\d{2}:\d{2}$/.test(value);
}

let pool: Pool | null = null;

function getPool() {
  if (pool) {
    return pool;
  }

  const connectionString = process.env.SUPABASE_SESSION_POOL_DATABASE_URL;

  if (!connectionString) {
    throw new Error("Missing SUPABASE_SESSION_POOL_DATABASE_URL");
  }

  pool = new Pool({
    connectionString,
    max: 10,
    idleTimeoutMillis: 30_000,
  });

  return pool;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as AppointmentPayload;
    const fullName = normalizeText(payload.fullName);
    const phone = normalizeText(payload.phone);
    const email = normalizeText(payload.email);
    const organization = normalizeText(payload.organization);
    const preferredDate = normalizeText(payload.preferredDate);
    const preferredTime = normalizeText(payload.preferredTime);
    const message = normalizeText(payload.message);

    if (!fullName || !phone || !email) {
      return Response.json(
        { error: "姓名、手机号和邮箱为必填项。" },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return Response.json({ error: "请输入有效的邮箱地址。" }, { status: 400 });
    }

    if (preferredDate && !isValidDate(preferredDate)) {
      return Response.json({ error: "预约日期格式不正确。" }, { status: 400 });
    }

    if (preferredTime && !isValidTime(preferredTime)) {
      return Response.json({ error: "预约时间格式不正确。" }, { status: 400 });
    }

    const result = await getPool().query<{ id: number }>(
      `
        insert into public.appointments (
          full_name,
          phone,
          email,
          organization,
          preferred_date,
          preferred_time,
          message,
          form_payload
        )
        values ($1, $2, $3, $4, $5, $6, $7, $8::jsonb)
        returning id
      `,
      [
        fullName,
        phone,
        email,
        organization || null,
        preferredDate || null,
        preferredTime || null,
        message || null,
        JSON.stringify({
          fullName,
          phone,
          email,
          organization,
          preferredDate,
          preferredTime,
          message,
        }),
      ],
    );

    return Response.json({
      message: "预约提交成功，我们会尽快与您联系。",
      id: result.rows[0]?.id ?? null,
    });
  } catch (error) {
    const message =
      error instanceof SyntaxError
        ? "请求体不是有效的 JSON。"
        : error instanceof Error &&
            error.message.includes("SUPABASE_SESSION_POOL_DATABASE_URL")
          ? "服务端尚未配置 Supabase Session Pool 连接串，请先补充环境变量。"
          : error instanceof Error
            ? `预约提交失败：${error.message}`
            : "预约提交失败，请稍后重试。";

    return Response.json({ error: message }, { status: 500 });
  }
}
