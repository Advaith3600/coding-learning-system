# Web Technologies

**Learn Web Technologies by doing.** A full-stack learning platform with a guided module path, in-browser editing, and instant feedback powered by **Piston**.

![Stack](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker&logoColor=white)

---

## Why this project exists

Traditional tutorials stop at “read and copy.” This project turns lessons into **challenges**: you write real code, submit it, and get pass/fail (and attempts tracked) against Piston. **Admins** can see class progress; **students** move through **modules** in order, unlocking the next tier as they earn it.

---

## Features

| Area | What you get |
|------|----------------|
| **Curriculum** | Modules with HTML/CSS challenges (more languages can be added later). |
| **Editor** | **Monaco** in the browser—syntax highlighting and a familiar editing experience. |
| **Judging** | **Piston** runs submissions in isolated sandboxes (self-hosted via Docker). |
| **Progress** | Per-challenge completion, attempts, and module-level overview for students. |
| **Admin** | Dashboard with ranks, module stats, per-student detail; create/edit/delete **student** accounts (username, email, password). |
| **Auth** | JWT cookie sessions; role-based access (**admin** vs **student**). |
| **SEO** | Sensible metadata, `robots.txt`, `sitemap.xml`, Open Graph—tune **`NEXT_PUBLIC_SITE_URL`** in production. |

---

## Architecture (high level)

```text
┌─────────────────┐     ┌──────────────┐     ┌─────────────────┐
│   Next.js app   │────▶│  Piston API  │
│  (UI + API)     │     │ (port 2000)  │
└────────┬────────┘     └──────────────┘
         │
         ▼
┌─────────────────┐
│  App Postgres   │  ← users, completions, attempts, login history
│  (Drizzle ORM)  │
└─────────────────┘
```

- **`next-app/`** — Next.js 14 (App Router), Tailwind, Drizzle migrations under `src/db/migrations/`.
- **Piston** — `ghcr.io/engineer-man/piston` image: execution API + runtime sandboxes.
- **`app-db`** — Separate Postgres **16** instance for application data.

---

## Quick start (Docker)

### 1. Configure environment

```bash
cp .env.example .env
```

Fill in **`APP_POSTGRES_PASSWORD`** (use a strong value).

### 2. Local overrides (recommended)

Copy the example override so Compose publishes ports and creates the dev network:

```bash
cp docker-compose.override.yml.example docker-compose.override.yml
```

### 3. Run the stack

```bash
docker compose up --build
```

- Wait **~10–30 seconds** on first boot for Piston to be ready (first runtime install / warmup can take a moment).
- **App DB migrations** run on production image startup (`Dockerfile`); for dev you can run them manually (see below).

### 4. Open the app

| URL | Service |
|-----|---------|
| **http://localhost:3001** | Next **dev** server (hot reload, with override) |
| **http://localhost:3000** | Next **production** build (when `next-app` is enabled in compose) |
| **http://localhost:2000/api/v2/runtimes** | Piston runtimes / health check |

### 5. Seed demo users (optional)

From the repo root, with containers up and `APP_DATABASE_URL` / passwords aligned:

```bash
docker compose exec next-app-dev npm run db:migrate
docker compose exec next-app-dev npm run db:seed
```

Default seed users (change passwords in production) are defined in `next-app/src/db/seed.ts`.

---

## Environment variables

| Variable | Purpose |
|----------|---------|
| `APP_POSTGRES_PASSWORD` | App DB user `app` |
| `PISTON_API_URL` | Used by Next to call Piston (`http://piston:2000` inside Compose) |
| `JWT_SECRET` | Sign auth cookies (set in `.env` for real deployments) |
| `NEXT_PUBLIC_SITE_URL` | Public site URL for canonical links, OG, sitemap (no trailing slash) |
| `DB_VOLUMES_BASE` | Optional base path for Postgres data dirs (default `./data`) |

See **`.env.example`** for comments and host-side `APP_DATABASE_URL` notes.

---

## Useful commands (inside `next-app/`)

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local dev server (outside Docker) |
| `npm run build` / `npm start` | Production build + standalone server |
| `npm run db:migrate` | Apply Drizzle migrations |
| `npm run db:seed` | Seed default users |
| `npm run db:generate` | Generate migrations from schema changes |
| `npm run build:favicon` | Regenerate `favicon.ico` from PNGs in `public/` |

---

## Repository layout

```text
coding-learning-system/
├── docker-compose.yml          # Core services + next-app
├── docker-compose.override.yml.example
├── .env.example
├── next-app/                   # Next.js application
│   ├── app/                    # App Router pages & API routes
│   ├── components/
│   ├── lib/                    # Auth, users, challenges, execution client
│   ├── src/db/                 # Drizzle schema, migrations, seed
│   └── public/                 # Static assets, favicons, Monaco bundle
└── README.md
```

---

## Contributing & license

Issues and PRs are welcome. If you extend the challenge catalog, keep IDs stable and run migrations for any schema change.

---

**Built with curiosity and caffeine—happy coding.**
