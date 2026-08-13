import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { createHash, timingSafeEqual } from "node:crypto";

const sessionConfig = {
  password: process.env["ADMIN_SESSION_SECRET"] ?? "",
  name: "gg-admin",
  maxAge: 60 * 60 * 12,
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: "lax" as const,
    path: "/",
  },
};

type AdminSession = { unlocked?: boolean };

function matches(input: string, expected: string): boolean {
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

export type Lead = {
  id: string;
  name: string;
  business_name: string;
  email: string;
  phone: string;
  city: string | null;
  website: string | null;
  message: string | null;
  created_at: string;
};

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string }) => data)
  .handler(async ({ data }) => {
    const expected = process.env["ADMIN_PASSWORD"];
    if (!expected) return { ok: false as const };
    if (!matches(data.password, expected)) return { ok: false as const };
    const session = await useSession<AdminSession>({
      ...sessionConfig,
      password: process.env["ADMIN_SESSION_SECRET"]!,
    });
    await session.update({ unlocked: true });
    return { ok: true as const };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(
  async () => {
    const session = await useSession<AdminSession>({
      ...sessionConfig,
      password: process.env["ADMIN_SESSION_SECRET"]!,
    });
    await session.clear();
    return { ok: true as const };
  },
);

export const adminGetLeads = createServerFn({ method: "GET" }).handler(
  async () => {
    const session = await useSession<AdminSession>({
      ...sessionConfig,
      password: process.env["ADMIN_SESSION_SECRET"]!,
    });
    if (!session.data.unlocked) {
      return { unlocked: false as const, leads: [] as Lead[] };
    }
    const { supabaseAdmin } = await import(
      "@/integrations/supabase/client.server"
    );
    const { data, error } = await supabaseAdmin
      .from("leads")
      .select(
        "id, name, business_name, email, phone, city, website, message, created_at",
      )
      .order("created_at", { ascending: false });
    if (error) throw new Error("Could not load submissions");
    return { unlocked: true as const, leads: (data ?? []) as Lead[] };
  },
);
