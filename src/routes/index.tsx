import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Search, Link2, Users, Send, Star } from "lucide-react";
import { GhlPopupProvider, useGhlPopup } from "@/components/GhlPopup";
import logo from "@/assets/logo.png.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      {
        title: "Get Glow Local — Automatic Google Review Requests for Local Businesses",
      },
      {
        name: "description",
        content:
          "We turn your happy customers into 5-star Google reviews automatically. Free for 14 days, no payment to start.",
      },
      {
        property: "og:title",
        content: "Get Glow Local — Automatic Google Review Requests for Local Businesses",
      },
      {
        property: "og:description",
        content:
          "We turn your happy customers into 5-star Google reviews automatically. Free for 14 days, no payment to start.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Get Glow Local",
          url: "https://getglowlocal.io",
          logo: `https://getglowlocal.lovable.app${logo.url}`,
          image: `https://getglowlocal.lovable.app${logo.url}`,
          description:
            "We turn your happy customers into 5-star Google reviews automatically for local businesses.",
          email: "grow@getglowlocal.io",
          priceRange: "$297/month",
          areaServed: "US",
        }),
      },
    ],
  }),
});

const NAV = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
        <a href="#top" className="flex items-center gap-2">
          <img
            src={logo.url}
            alt="Get Glow Local logo"
            className="h-9 w-auto object-contain"
          />
          <span className="sr-only">Get Glow Local</span>
        </a>
        <nav className="hidden items-center gap-8 sm:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-foreground transition-colors hover:text-accent"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="sm:hidden rounded-md border border-border p-2 text-foreground"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-border bg-background sm:hidden">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block border-b border-border/60 px-5 py-4 text-base font-medium text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function Cta({ className = "" }: { className?: string }) {
  const openPopup = useGhlPopup();
  return (
    <button
      type="button"
      onClick={openPopup}
      className={`inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-base font-semibold text-accent-foreground transition-colors hover:bg-accent/90 ${className}`}
    >
      Get Started Free
    </button>
  );
}


const STEPS = [
  {
    icon: Link2,
    title: "We connect your Google Business Profile",
    body: "Takes a few minutes. No tech skills needed.",
  },
  {
    icon: Users,
    title: "We import your customer list",
    body: "From whatever system you already use.",
  },
  {
    icon: Send,
    title: "Review requests go out automatically",
    body: "Every time you finish a job.",
  },
  {
    icon: Star,
    title: "Reviews start rolling in",
    body: "You don't lift a finger.",
  },
];

function Index() {
  return (
    <GhlPopupProvider>
    <div id="top" className="min-h-screen scroll-smooth bg-background">
      <Header />

      <main>
        <section className="mx-auto max-w-3xl px-5 py-20 text-center sm:py-28">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            Your Competitors Have More Reviews Than You. Here's Why.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            We turn your happy customers into 5-star Google reviews
            automatically. Free for 14 days, no payment to start.
          </p>
          <Cta className="mt-9" />
        </section>

        <section className="border-t border-border bg-card">
          <div className="mx-auto max-w-3xl px-5 py-20">
            <Search className="size-7 text-accent" />
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground">
              People Are Searching for You Right Now
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              When someone searches for a business like yours, they see the one
              with more reviews first, not the better one, just the more trusted
              looking one. If your review count is behind, you're losing
              customers you never even knew were looking.
            </p>
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-20 border-t border-border">
          <div className="mx-auto max-w-3xl px-5 py-20">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Set It Up Once. It Runs Itself.
            </h2>
            <ol className="mt-10 grid gap-8">
              {STEPS.map((s, i) => (
                <li key={s.title} className="flex gap-5">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10">
                    <s.icon className="size-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-accent">
                      Step {i + 1}
                    </p>
                    <h3 className="mt-1 text-xl font-semibold text-foreground">
                      {s.title}
                    </h3>
                    <p className="mt-1 text-base text-muted-foreground">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-t border-border bg-card">
          <div className="mx-auto max-w-3xl px-5 py-20">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Your First Win Happens Fast
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Most owners see new reviews within the first couple weeks, just
              from reaching out to customers they've already worked with. From
              there, every new job brings in another review, automatically, for
              as long as you're running it.
            </p>
          </div>
        </section>

        <section id="pricing" className="scroll-mt-20 border-t border-border">
          <div className="mx-auto max-w-3xl px-5 py-20 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Try It Free. Keep It If You Love It.
            </h2>
            <p className="mx-auto mt-5 max-w-xl whitespace-pre-line text-lg leading-relaxed text-muted-foreground">
              14 days free. $297/month after, only if you want to keep it. No
              contract. Cancel anytime, no questions asked.
              {"\n"}Ready to See Your Review Gap?
              {"\n"}Tell us a bit about your business and we'll reach out to get you
              set up.
            </p>
            <Cta className="mt-9" />
          </div>
        </section>

        <section id="contact" className="scroll-mt-20 border-t border-border bg-card">
          <div className="mx-auto max-w-2xl px-5 py-20">
            <div className="mt-9">
              <Cta />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-lg font-semibold text-foreground">getglowlocal.io</p>
            <p className="mt-1 text-base text-muted-foreground">
              More reviews. More trust. More customers.
            </p>
            <a
              href="mailto:grow@getglowlocal.io"
              className="mt-3 inline-block text-base text-accent underline-offset-4 hover:underline"
            >
              grow@getglowlocal.io
            </a>
          </div>
          <div className="flex gap-5 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
    </GhlPopupProvider>
  );
}
