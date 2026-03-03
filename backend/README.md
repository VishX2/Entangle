# Entangle Backend (Express.js + Prisma + PostgreSQL)

Node.js/Express API with **Prisma** ORM. Schema: `prisma/schema.prisma` (aligned with `entangle_db.sql`).

## Setup

1. **PostgreSQL:** Install [PostgreSQL](https://www.postgresql.org/download/) if needed. Create a database:
   - `psql -U postgres` then `CREATE DATABASE entangle;` (or use pgAdmin / `createdb entangle`).
2. **Env:** Copy `.env.example` to `.env`. Set:
   - `DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/entangle` (use your PostgreSQL user and password).
   - `JWT_SECRET` to any long random string.
3. **Install & DB:** Run `npm install` (runs `prisma generate`). Then create tables: `npx prisma migrate dev --name init` or `npx prisma db push`. Seed 10 companies (5 entrepreneurs, 3 startups, 2 investors) and an admin user: `npx prisma db seed` or `npm run seed`.
4. **Run:** `npm run dev` (or on Windows PowerShell, if scripts are disabled, use `npm.cmd run dev`). Server listens on `PORT` (default 3000). You should see: `PostgreSQL connected (Prisma)` then `Entangle API: http://localhost:PORT`.

## API (single standard surface under `/api`)

- **Auth:** `POST /api/auth/register`, `POST /api/auth/login`
- **Roles:** `GET /api/roles`, `GET /api/roles/:id`
- **Companies:** `GET /api/companies` (public; admin sees inactive too), `GET /api/companies/summary`, `GET /api/companies/:id`, `GET /api/companies/:companyId/reviews`; `POST/PATCH/DELETE /api/companies` (admin)
- **Reviews:** `GET /api/reviews/:id`, `POST /api/reviews/:id/helpful`; `POST/PATCH/DELETE /api/reviews` (auth); `GET /api/reviews` (admin, with query)
- **Users:** `GET/PATCH /api/users/me` (auth); `GET /api/users`, `GET/PATCH /api/users/:id` (admin)
- **Health:** `GET /health`
