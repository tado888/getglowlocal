import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";
import {
  adminGetLeads,
  adminLogin,
  adminLogout,
  type Lead,
} from "@/lib/admin.functions";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin — Get Glow Local" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Private admin area." },
    ],
  }),
  component: AdminPage,
});

type SortKey = keyof Lead;

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: "name", label: "Name" },
  { key: "business_name", label: "Business Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "city", label: "City" },
  { key: "website", label: "Website" },
  { key: "message", label: "Message" },
  { key: "created_at", label: "Date Submitted" },
];

function AdminPage() {
  const getLeads = useServerFn(adminGetLeads);
  const login = useServerFn(adminLogin);
  const logout = useServerFn(adminLogout);

  const [loading, setLoading] = useState(true);
  const [unlocked, setUnlocked] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortAsc, setSortAsc] = useState(false);
  const [query, setQuery] = useState("");

  async function load() {
    setLoading(true);
    try {
      const res = await getLeads();
      setUnlocked(res.unlocked);
      setLeads(res.leads);
    } catch {
      setError("Something went wrong loading submissions.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sorted = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? leads.filter((lead) =>
          COLUMNS.some((col) =>
            String(lead[col.key] ?? "")
              .toLowerCase()
              .includes(q),
          ),
        )
      : leads;
    const copy = [...filtered];
    copy.sort((a, b) => {
      const av = a[sortKey] ?? "";
      const bv = b[sortKey] ?? "";
      const cmp = String(av).localeCompare(String(bv), undefined, {
        numeric: true,
        sensitivity: "base",
      });
      return sortAsc ? cmp : -cmp;
    });
    return copy;
  }, [leads, sortKey, sortAsc, query]);

  function exportCsv() {
    const escape = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const header = COLUMNS.map((c) => escape(c.label)).join(",");
    const rows = sorted.map((lead) =>
      COLUMNS.map((c) =>
        escape(
          c.key === "created_at"
            ? new Date(lead.created_at).toLocaleString()
            : lead[c.key],
        ),
      ).join(","),
    );
    const csv = [header, ...rows].join("\r\n");
    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }


  async function onLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const res = await login({ data: { password } });
    if (!res.ok) {
      setError("That password is not right.");
      return;
    }
    setPassword("");
    await load();
  }

  async function onLogout() {
    await logout();
    setLeads([]);
    setUnlocked(false);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background px-6 py-20 text-foreground">
        <p className="text-center text-muted-foreground">Loading...</p>
      </main>
    );
  }

  if (!unlocked) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
        <form
          onSubmit={onLogin}
          className="w-full max-w-sm rounded-xl border border-foreground/15 bg-card p-6"
        >
          <h1 className="text-2xl font-bold text-foreground">Admin login</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Enter the password to view form submissions.
          </p>
          <label
            htmlFor="admin-password"
            className="mt-6 block text-sm font-medium text-foreground"
          >
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-md border border-foreground/20 bg-background px-3 py-2 text-foreground outline-none focus:border-accent"
          />
          {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
          <button
            type="submit"
            className="mt-4 w-full rounded-md bg-foreground px-4 py-2 font-semibold text-background"
          >
            Log in
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-10 text-foreground sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Form submissions</h1>
            <p className="text-sm text-muted-foreground">
              Showing {sorted.length} of {leads.length}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search submissions"
              aria-label="Search submissions"
              className="rounded-md border border-foreground/20 bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
            />
            <button
              onClick={exportCsv}
              className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground"
            >
              Export to CSV
            </button>
            <button
              onClick={onLogout}
              className="rounded-md border border-foreground/20 px-4 py-2 text-sm font-medium"
            >
              Log out
            </button>
          </div>
        </div>


        <div className="mt-6 overflow-x-auto rounded-xl border border-foreground/15 bg-card">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="border-b border-foreground/15">
              <tr>
                {COLUMNS.map((col) => (
                  <th key={col.key} className="p-3 font-semibold">
                    <button
                      type="button"
                      onClick={() => {
                        if (sortKey === col.key) setSortAsc((v) => !v);
                        else {
                          setSortKey(col.key);
                          setSortAsc(true);
                        }
                      }}
                      className="inline-flex items-center gap-1 hover:text-accent"
                    >
                      {col.label}
                      {sortKey === col.key ? (sortAsc ? " ↑" : " ↓") : ""}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 && (
                <tr>
                  <td
                    colSpan={COLUMNS.length}
                    className="p-6 text-center text-muted-foreground"
                  >
                    No submissions yet.
                  </td>
                </tr>
              )}
              {sorted.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-foreground/10 last:border-0 align-top"
                >
                  <td className="p-3">{lead.name}</td>
                  <td className="p-3">{lead.business_name}</td>
                  <td className="p-3">
                    <a href={`mailto:${lead.email}`} className="underline">
                      {lead.email}
                    </a>
                  </td>
                  <td className="p-3">{lead.phone}</td>
                  <td className="p-3">{lead.city ?? "-"}</td>
                  <td className="p-3">{lead.website ?? "-"}</td>
                  <td className="p-3 max-w-xs whitespace-pre-wrap">
                    {lead.message ?? "-"}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    {new Date(lead.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
