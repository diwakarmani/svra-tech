# SVRA Technology Solutions – Landing Page

Modern Next.js landing page for [svra-tech.com](https://svra-tech.com), migrated from the legacy HTML/CSS site hosted on AWS S3.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **HTTP:** Axios

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Copy and configure environment variables
cp .env.example .env.local

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `NEXT_PUBLIC_ENQUIRY_API_URL` | `https://svra-tms-native-latest.onrender.com/api/public/enquiry` | Contact form API endpoint |
| `NEXT_PUBLIC_ENTITY_CODE` | `SVRA-TECH` | Entity code sent with every enquiry |

Both variables have safe defaults so the app runs without a `.env.local` file.

## Build & Deploy

```bash
npm run build   # production build
npm run start   # serve production build locally
```

### Vercel Deployment

1. Import this repo in [Vercel](https://vercel.com/new).
2. Set root directory to `svra-tech` (if deploying from the monorepo).
3. No additional environment variables are required for the default setup.
4. After verifying the Vercel preview URL, add `svra-tech.com` and `www.svra-tech.com` as custom domains in Vercel.
5. Update Route 53 DNS records to point to Vercel (provided during domain setup).
6. Only after the Vercel domain is live, disable the AWS CloudFront distribution.

## Pages

| Route | Description |
|---|---|
| `/` | Home – Hero, About, Services, Contact CTA |
| `/contact` | Full enquiry form + contact info |

## Assets

All images in `public/images/` were exported from the S3 bucket `new-svra-tech.com`.
