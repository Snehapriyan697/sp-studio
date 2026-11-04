# sp-studio

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_qJF6WZ4VU7P0hoV6rwaGskDxpVu7)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.

## Contact form backend setup

The portfolio contact form stores submissions in Supabase and can send an email notification through Resend.

1. Create a Supabase project.
2. Open the Supabase SQL Editor and run `supabase/contact-schema.sql`.
3. In Resend, verify a domain you control and create an API key.
4. Copy `.env.example` to `.env.local` for local development, then fill in the values. In Vercel, add the same variables under Project → Settings → Environment Variables:
   - `SUPABASE_URL`: Project URL from Supabase.
   - `SUPABASE_SERVICE_ROLE_KEY`: service-role/secret key from Supabase. Keep it server-only; never use a `NEXT_PUBLIC_` prefix.
   - `RESEND_API_KEY`: Resend API key.
   - `CONTACT_EMAIL`: inbox that should receive messages.
   - `CONTACT_FROM_EMAIL`: sender using the domain verified with Resend, e.g. `Portfolio <contact@example.com>`.
5. Redeploy the Vercel project after setting the variables.

Messages are saved even if Resend email delivery is temporarily unavailable. View them in the Supabase Table Editor under `contact_messages`. The API applies server-side validation, a honeypot field, same-origin checks, and a per-IP rate limit (4 submissions per hour).

Do not commit `.env.local` or paste service-role/API keys into source files. The example file contains placeholders only.
