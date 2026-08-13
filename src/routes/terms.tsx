import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  component: Terms,
  head: () => ({
    meta: [
      { title: "Terms of Service — Get Glow Local" },
      {
        name: "description",
        content:
          "The terms that apply when you use the Get Glow Local review service.",
      },
      { property: "og:title", content: "Terms of Service — Get Glow Local" },
      {
        property: "og:description",
        content: "The terms that apply to the Get Glow Local service.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/terms" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
});

function Terms() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-20">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Terms
      </h1>
      <p className="mt-6 text-base leading-relaxed text-muted-foreground">
        Your first 14 days are free. After that the service is $297 per month.
        There is no contract and you can cancel anytime. Full terms coming soon.
      </p>
      <Link to="/" className="mt-8 inline-block text-base text-accent hover:underline">
        Back to home
      </Link>
    </div>
  );
}
