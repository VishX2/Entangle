# Entangle Backend

Express.js + PostgreSQL API for the Entangle platform. Handles auth, companies, reviews, connection requests, messaging, notifications, AI matchmaking, PII content scan, and admin operations.

## Prerequisites

- **Node.js** >= 18
- **PostgreSQL** (local or remote)
- **npm** or **yarn**

## Quick Start

### 1. Install dependencies

```bash
cd server
npm install
```

### 2. Configure environment

Copy the example env file and edit it:

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
PORT=8000
NODE_ENV=development
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE_NAME
JWT_SECRET=your-long-random-secret-at-least-32-chars

# Admin user (created by seed)
ADMIN_EMAIL=admin@entangle.local
ADMIN_PASSWORD=Admin123!
```

| Variable      | Description                                      |
|---------------|--------------------------------------------------|
| `PORT`        | Server port (default: 8000)                      |
| `NODE_ENV`    | `development` or `production`                   |
| `DATABASE_URL`| PostgreSQL connection string                    |
| `JWT_SECRET`  | Secret for signing JWTs (use a strong random value) |

**Example `DATABASE_URL` for local PostgreSQL:**

```
postgresql://postgres:yourpassword@localhost:5432/entangle_db
```

### 3. Create the database

Create a database in PostgreSQL (if it doesn't exist):

```sql
CREATE DATABASE entangle_db;
```

Or using the command line:

```bash
createdb entangle_db
```

### 4. Push schema and seed data

```bash
npx prisma db push
npm run seed
```

This will:

- Create/update all tables from the Prisma schema
- Seed roles (admin, user)
- Seed an **admin user** from `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env`
- Seed **100 companies** (entrepreneurs, startups, investors) with company owners
- Seed sample reviews and reports
- Seed **6 demo conversations** with messages (login as `investor@demo.com` / `Test123!` to see them)

**Note:** Use the seeded admin credentials to log in to the admin app. All new registrations are regular users; admins can promote users via User Management.

### 5. Start the server

```bash
npm run dev
```

The API will be available at `http://localhost:8000`.

---

## Scripts

| Command        | Description                                      |
|----------------|--------------------------------------------------|
| `npm run dev`  | Start with nodemon (auto-reload on changes)      |
| `npm start`    | Start production server                         |
| `npm run seed` | Push schema + run seed script                   |
| `npm run reset`| Force-reset DB, push schema, then seed          |

---

## API Endpoints

### Auth (public)

| Method | Endpoint                    | Description                    |
|--------|-----------------------------|--------------------------------|
| POST   | `/api/auth/register`        | Register user                  |
| POST   | `/api/auth/login`           | Login (user app)               |
| POST   | `/api/auth/login-admin`     | Login (admin app only)         |
| POST   | `/api/auth/forgot-password` | Request password reset email   |
| POST   | `/api/auth/reset-password`  | Reset password with token      |

### Companies

| Method | Endpoint                          | Auth      | Description              |
|--------|-----------------------------------|-----------|--------------------------|
| GET    | `/api/companies`                  | Optional  | List companies (filter by type) |
| GET    | `/api/companies/summary`           | Public    | Company summary stats    |
| GET    | `/api/companies/:id`             | Optional  | Get company by ID        |
| GET    | `/api/companies/:id/reviews`     | Public    | Get reviews for company   |
| POST   | `/api/companies`                 | Admin     | Create company           |
| PATCH  | `/api/companies/:id`             | Admin     | Update company           |
| DELETE | `/api/companies/:id`             | Admin     | Soft-delete (is_active=false) |

### Connection Requests

| Method | Endpoint                          | Auth  | Description              |
|--------|-----------------------------------|-------|--------------------------|
| POST   | `/api/connection-requests`        | Auth  | Send connection request   |
| GET    | `/api/connection-requests/sent`   | Auth  | List sent requests       |
| GET    | `/api/connection-requests`        | Admin | List all requests        |
| PATCH  | `/api/connection-requests/:id`    | Admin | Update status            |

### Messaging

| Method | Endpoint                                    | Auth | Description              |
|--------|---------------------------------------------|------|--------------------------|
| GET    | `/api/conversations`                        | Auth | List conversations       |
| POST   | `/api/conversations`                        | Auth | Get or create (body: `other_user_id`) |
| GET    | `/api/conversations/:id/messages`           | Auth | List messages            |
| POST   | `/api/conversations/:id/messages`           | Auth | Send message (body: `content`) |

### AI Matchmaking

| Method | Endpoint                                              | Auth    | Description              |
|--------|-------------------------------------------------------|---------|--------------------------|
| GET    | `/api/matchmaking/investors-for-startup/:startupId`   | Optional| Match investors for startup |
| GET    | `/api/matchmaking/startups-for-investor/:investorId`   | Optional| Match startups for investor |
| GET    | `/api/matchmaking/investors-for-entrepreneur/:id`      | Optional| Match investors for entrepreneur |
| GET    | `/api/matchmaking/entrepreneurs-for-investor/:id`      | Optional| Match entrepreneurs for investor |
| GET/POST | `/api/matchmaking/search`                            | Optional| Search by natural language prompt |

### Notifications

| Method | Endpoint                          | Auth | Description              |
|--------|-----------------------------------|------|--------------------------|
| GET    | `/api/notifications`              | Auth | List notifications       |
| PATCH  | `/api/notifications/:id/read`     | Auth | Mark as read            |
| PATCH  | `/api/notifications/read-all`    | Auth | Mark all as read        |

### Content Scan (PII detection)

| Method | Endpoint              | Auth    | Description              |
|--------|-----------------------|---------|--------------------------|
| POST   | `/api/content/scan`   | Optional| Scan text for PII patterns |

### Reviews

| Method | Endpoint                    | Auth  | Description          |
|--------|-----------------------------|-------|----------------------|
| POST   | `/api/reviews`              | Auth  | Create review        |
| PATCH  | `/api/reviews/:id`          | Auth  | Update review        |
| DELETE | `/api/reviews/:id`          | Auth  | Delete review        |
| POST   | `/api/reviews/:id/helpful`  | Public| Mark review helpful  |

### Admin

| Method | Endpoint              | Auth  | Description        |
|--------|-----------------------|-------|--------------------|
| GET    | `/api/dashboard/stats`| Admin | Dashboard stats    |
| GET    | `/api/reports`        | Admin | List reports       |
| PATCH  | `/api/reports/:id`    | Admin | Update report      |
| GET    | `/api/users`          | Admin | List users         |

---

## Project Structure

```
server/
├── prisma/
│   └── schema.prisma    # Database schema
├── seeds/
│   └── seed.js          # Seed script
├── src/
│   ├── controllers/     # Route handlers
│   ├── lib/             # Prisma client
│   ├── middleware/      # Auth, error handling
│   ├── routes/          # API routes
│   └── index.js         # Entry point
├── .env                 # Environment variables (create from .env.example)
├── .env.example
└── package.json
```

---

## Troubleshooting

### Database connection failed

- Ensure PostgreSQL is running
- Check `DATABASE_URL` format and credentials
- Verify the database exists: `psql -l`

### Prisma / schema issues

```bash
npx prisma generate   # Regenerate Prisma client
npx prisma db push    # Sync schema to database
```

### Fresh start (wipe and reseed)

```bash
npm run reset
```

### Port already in use

Change `PORT` in `.env` or stop the process using port 8000.

---

## Frontend Apps

- **Admin app** – `http://localhost:5174` (set `VITE_API_URL=http://localhost:8000`)
- **User app** – `http://localhost:5173` (set `VITE_API_URL=http://localhost:8000`)
