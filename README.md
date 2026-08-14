# Get Glow Local Website

Build a one-page marketing website for a local business reputation management service called "Get Glow Local" (domain: getglowlocal.io).

BUSINESS CONTEXT:

We help local business owners (contractors, salons, med spas, restaurants, home services) automatically get more Google reviews from their past and new customers. We connect to their Google Business Profile, import their customer list, and automatically send review requests after every completed job so reviews start coming in without the owner doing anything. Offer: 14-day free trial, no payment required to start, converts to $297/month, cancel anytime, no contract.

LOGO:

I'm attaching our actual logo image. Use this exact uploaded image for the header and favicon, do not redesign or recreate a new version of it. It's a circular badge: black outline circle, a map pin icon, "GET GLOW" in bold black text and "LOCAL" in forest green below it, on a cream background.

BRAND COLORS (pulled from the logo, use these site-wide):

- Background: warm cream/off-white (#F2F0E6 or similar)

- Primary text/accents: near-black (#1F1F1F or similar)

- Secondary accent: forest green (#2E5339 or similar)

- Clean and high-contrast, no gradients, no gold or bright colors

TONE & AUDIENCE:

Local business owners, busy, skeptical of "software" pitches, not tech-savvy. Plain, conversational language (6th-8th grade reading level). No jargon like "CRM," "automation platform," or "workflow." This should feel like a straightforward local service, not a SaaS startup.

NAVIGATION:

Simple sticky header with the logo on the left and anchor links on the right: How It Works, Pricing, Contact. On mobile, collapse into a simple menu icon.

STRUCTURE (single page, smooth-scroll sections):

1. HERO

- Headline: "Your Competitors Have More Reviews Than You. Here's Why."

- Subheadline: "We turn your happy customers into 5-star Google reviews automatically. Free for 14 days, no payment to start."

- CTA button: "Get Started Free" (scrolls to contact form)

2. THE PROBLEM

- Header: "People Are Searching for You Right Now"

- Body: "When someone searches for a business like yours, they see the one with more reviews first, not the better one, just the more trusted looking one. If your review count is behind, you're losing customers you never even knew were looking."

3. HOW IT WORKS

- Header: "Set It Up Once. It Runs Itself."

- Step 1: "We connect your Google Business Profile" (takes a few minutes, no tech skills needed)

- Step 2: "We import your customer list" (from whatever system you already use)

- Step 3: "Review requests go out automatically" (every time you finish a job)

- Step 4: "Reviews start rolling in" (you don't lift a finger)

- Simple numbered steps with small icons, not technical diagrams

4. WHY IT WORKS

- Header: "Your First Win Happens Fast"

- Body: "Most owners see new reviews within the first couple weeks, just from reaching out to customers they've already worked with. From there, every new job brings in another review, automatically, for as long as you're running it."

5. PRICING

- Header: "Try It Free. Keep It If You Love It."

- Body: "14 days free. $297/month after, only if you want to keep it. No contract. Cancel anytime, no questions asked."

- CTA button: "Get Started Free"

6. CONTACT / LEAD FORM

- Header: "Ready to See Your Review Gap?"

- Subtext: "Tell us a bit about your business and we'll reach out to get you set up."

- Form fields: Name, Business Name, Email, Phone, City (optional), "Tell us about your business" (optional text area)

- Include a hidden honeypot field for basic spam/bot protection (no CAPTCHA, keep it frictionless for real visitors)

- Submit button: "Get Started Free"

- After submit, show a thank-you message inline (no redirect): "Thanks, we've got your info. We'll reach out shortly to get your free trial started."

- IMPORTANT: wire the form to actually capture submissions somewhere I can see them (Lovable's built-in Supabase/database integration is fine). I need to view and follow up on every submission, not just have it fire off an email.

7. FOOTER

- "getglowlocal.io" plus tagline "More reviews. More trust. More customers."

- Simple contact email placeholder

- Small text links for "Privacy Policy" and "Terms" (stub pages are fine for now, just need the links present)

SEO:

- Page title: "Get Glow Local — Automatic Google Review Requests for Local Businesses"

- Meta description: "We turn your happy customers into 5-star Google reviews automatically. Free for 14 days, no payment to start."

DESIGN DIRECTION:

- Clean, modern, trustworthy, like a small professional local service, not a tech startup

- Mobile-first, most visitors will be on their phones

- Fast-loading, minimal animation, no stock-photo clichés

- Generous white space, large readable text, real section headers

RULES:

- Do not include testimonials, review counts, client counts, star ratings, or any invented statistics or trust signals, real ones will be added later

- Keep copy short throughout, avoid walls of text

- Do not use em-dashes anywhere in the copy

- Use the exact same CTA button text ("Get Started Free") everywhere it appears, for consistency

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://getglowlocal.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/16e6bdaf-0df0-4f95-84ed-ac5e7fb659f5).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
