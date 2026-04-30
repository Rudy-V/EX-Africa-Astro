# Experience Africa Safaris

Website for **Experience Africa Safaris** — bespoke luxury safari bookings, lodge experiences, and curated travel across Africa. Built with [Astro](https://astro.build) and deployed on [Vercel](https://vercel.com).

Live site: [experienceafrica.co.za](https://experienceafrica.co.za)

---

## Tech Stack

- **[Astro](https://astro.build)** — static site framework
- **[Lit](https://lit.dev)** — web components
- **[Vercel](https://vercel.com)** — hosting and CDN
- **[YOCO](https://www.yoco.co.za)** — payment processing
- **Google Apps Script** — contact/inquiry form backend

---

## Pages

| Route | Description |
|---|---|
| `/` | Homepage |
| `/safaris` | Pre-planned curated safaris |
| `/locations` | Destinations |
| `/about` | About Experience Africa Safaris |
| `/contact` | Contact form |
| `/FAQ` | Frequently asked questions |
| `/paylink/[id]` | Customer payment link |
| `/admin/paylinks` | Admin: generate payment links |

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

### Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `PUBLIC_GOOGLE_SCRIPT_URL` | Google Apps Script URL for the contact form |
| `YOCO_PUBLIC_KEY` | YOCO public key (from [YOCO portal](https://portal.yoco.co.za)) |
| `YOCO_SECRETE_KEY` | YOCO secret key |

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server at `localhost:4321` |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run format` | Format code with Prettier |

---

## Deployment

The site deploys automatically to Vercel on push to `main`. Set environment variables in the Vercel project settings under **Settings → Environment Variables**.

---

## Contact

**Experience Africa Safaris**
- Email: curteis@experienceafrica.co.za
- WhatsApp: +27 64 738 8344
- Instagram: [@theexperienceafrica](https://instagram.com/theexperienceafrica)
- Facebook: [Thexperienceafrica](https://facebook.com/Thexperienceafrica)
- YouTube: [Theexperienceafrica](https://www.youtube.com/Theexperienceafrica/featured)
- TikTok: [@curt_is_wild](https://tiktok.com/@curt_is_wild)
