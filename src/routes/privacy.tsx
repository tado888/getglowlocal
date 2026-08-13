import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  component: Privacy,
  head: () => ({
    meta: [
      { title: "Privacy Policy — Get Glow Local" },
      {
        name: "description",
        content:
          "How Get Glow Local collects, uses, and protects information from local business owners.",
      },
      { property: "og:title", content: "Privacy Policy — Get Glow Local" },
      {
        property: "og:description",
        content: "How Get Glow Local handles your information.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/privacy" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
});

function Privacy() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-20">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Privacy Policy
      </h1>
      <p className="mt-6 text-base leading-relaxed text-muted-foreground">
        We collect the details you give us through our contact form so we can
        reach out about your free trial. We do not sell your information. Full
        policy coming soon.
      </p>
      <Link to="/" className="mt-8 inline-block text-base text-accent hover:underline">
        Back to home
      </Link>
    </div>
  );
}
