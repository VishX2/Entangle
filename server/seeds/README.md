# Seeds

- **seed.js** – Seeds 10 companies and ensures roles + one admin user exist.
  - **5 entrepreneurs:** Sarah Chen, Michael Eriksson, Elena Vasquez, James Okonkwo, Priya Sharma
  - **3 startups:** GreenTech Solutions, HealthAI, FlowPay
  - **2 investors:** Nordic Ventures, Stockholm Angel Network

Also creates/updates roles (admin, user) and one admin user: **admin@entangle.com** / **admin123** (for logging into the admin app).

**Run (order matters):**

1. Create tables first (if not done yet):
   ```bash
   npx prisma db push
   ```
   or `npx prisma migrate dev --name init`

2. Then seed:
   ```bash
   npm run seed
   ```
   or `npx prisma db seed` Safe to run multiple times for a fresh DB; if you already have companies with the same names, the script will error (Prisma create). For a clean seed, reset the DB first: `npx prisma migrate reset` (drops DB, reapplies migrations, then runs seed).
