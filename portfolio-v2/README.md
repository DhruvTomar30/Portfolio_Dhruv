# Dhruv Tomar — Portfolio v2

Next.js 16 frontend + Express 5 / Zod / MongoDB backend. Replaces the old static Bootstrap/jQuery site (removed; still available in git history).

```
portfolio-v2/
├── backend/    Express API — Route → Validator (Zod) → Controller → Service/Model → DTO
├── frontend/   Next.js App Router site + /admin (messages inbox, projects manager)
├── deploy/     Nginx sample (draft)
└── docker-compose.dev.yml   local MongoDB
```

## Run locally

Needs Node 22+, pnpm, and Docker (or any MongoDB).

```bash
# 1. MongoDB
docker volume create portfolio-mongo-data
docker compose -f docker-compose.dev.yml up -d

# 2. API  → http://localhost:5050/api/health
cd backend
pnpm install
cp .env.example .env.development        # then fill in JWT_SECRET and ADMIN_PASSWORD_HASH
pnpm hash-password 'choose-a-password'  # paste the output into ADMIN_PASSWORD_HASH
pnpm seed                               # loads profile, projects, skills, experience…
pnpm dev

# 3. Site  → http://localhost:3000   (admin: /admin/login)
cd ../frontend
pnpm install
cp .env.example .env.local
pnpm dev
```

## Editing content

- **Projects** and **messages**: use `/admin`. Saving refreshes the public pages immediately.
- **Everything else** (profile, experience, skills, education, certificates): edit
  `backend/scripts/seed-data.js`, then run `pnpm seed` and `pnpm sync-fallback`.
  The second command copies the content to `frontend/src/data/fallback.json`, which the site uses if the API is down.
  The public pages cache content for up to an hour, so restart the frontend after re-seeding to see changes at once.
- `pnpm seed --reset` wipes the content collections first. It never touches contact messages, but it **does** remove projects you added in `/admin`.

## Contact email

Messages are always saved to MongoDB. To also email them to you, set `SMTP_USER` and `SMTP_PASS` in the backend env. `SMTP_PASS` is a Gmail App Password (https://myaccount.google.com/apppasswords).

## Production build

```bash
cd backend  && pnpm install --prod && pm2 start ecosystem.config.cjs --env production
cd frontend && pnpm install && pnpm build && pm2 start ecosystem.config.cjs --env production
```

Frontend env for production (`frontend/.env.production`):

```
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_API_URL=https://yourdomain.com     # NEXT_PUBLIC_* are baked in at build time
API_URL_INTERNAL=http://127.0.0.1:5050
```

Backend env for production (`backend/.env.production`): set `MONGO_URI`, a long random `JWT_SECRET` (`openssl rand -hex 32`), `ADMIN_PASSWORD_HASH`, `CORS_ORIGINS=https://yourdomain.com` and the SMTP values.

See `deploy/nginx.portfolio.conf.example` for a reverse-proxy layout. Server setup itself follows the separate deployment plan.
