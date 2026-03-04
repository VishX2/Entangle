/**
 * Seed: companies, reviews, reports for dashboard demo.
 * Run: npx prisma db push   then   npm run seed
 */
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function monthsAgo(n) {
  const d = new Date();
  d.setMonth(d.getMonth() - n);
  return d;
}

async function main() {
  try {
    await prisma.$queryRaw`SELECT 1 FROM "Role" LIMIT 1`;
  } catch (err) {
    if (err.code === 'P2021' || err.message?.includes('does not exist')) {
      console.error('Tables do not exist. Run first:  npx prisma db push');
      process.exit(1);
    }
    throw err;
  }

  await prisma.role.upsert({
    where: { id: 1 },
    create: { id: 1, name: 'admin', description: 'Full access' },
    update: {},
  });
  await prisma.role.upsert({
    where: { id: 2 },
    create: { id: 2, name: 'user', description: 'Regular user' },
    update: {},
  });

  // Users: not seeded. First to register becomes admin (role_id 1).

  await prisma.report.deleteMany({});
  await prisma.review.deleteMany({});
  await prisma.company.deleteMany({});

  const createdCompanies = [];

  const entrepreneurs = [
    { name: 'Sarah Chen', description: 'Serial entrepreneur', headquarters: 'Stockholm', founder_name: 'Sarah Chen', years_experience: 12, is_verified: true, verification_tier: 'gold', created_at: monthsAgo(5) },
    { name: 'Michael Eriksson', description: 'SaaS founder', headquarters: 'Gothenburg', founder_name: 'Michael Eriksson', years_experience: 15, is_verified: true, verification_tier: 'gold', created_at: monthsAgo(4) },
    { name: 'Elena Vasquez', description: 'Healthtech founder', headquarters: 'Barcelona', founder_name: 'Elena Vasquez', years_experience: 8, is_verified: false, verification_tier: 'bronze', created_at: monthsAgo(3) },
    { name: 'James Okonkwo', description: 'Fintech entrepreneur', headquarters: 'Lagos', founder_name: 'James Okonkwo', years_experience: 10, is_verified: true, verification_tier: 'silver', created_at: monthsAgo(2) },
    { name: 'Priya Sharma', description: 'E-commerce founder', headquarters: 'Mumbai', founder_name: 'Priya Sharma', years_experience: 7, is_verified: true, verification_tier: 'silver', created_at: monthsAgo(1) },
  ];
  for (const e of entrepreneurs) {
    const { created_at, ...rest } = e;
    const c = await prisma.company.create({
      data: { ...rest, company_type: 'entrepreneur', created_at },
    });
    createdCompanies.push(c);
  }

  const startups = [
    { name: 'GreenTech Solutions', description: 'Sustainable energy', headquarters: 'Copenhagen', funding_stage: 'Seed', team_size: 8, is_verified: false, verification_tier: 'bronze', created_at: monthsAgo(4) },
    { name: 'HealthAI', description: 'AI diagnostics', headquarters: 'Uppsala', funding_stage: 'Series A', team_size: 15, is_verified: true, verification_tier: 'gold', created_at: monthsAgo(2) },
    { name: 'FlowPay', description: 'B2B payments', headquarters: 'Berlin', funding_stage: 'Series B', team_size: 42, is_verified: true, verification_tier: 'gold', created_at: monthsAgo(0) },
  ];
  for (const s of startups) {
    const { created_at, ...rest } = s;
    const c = await prisma.company.create({
      data: { ...rest, company_type: 'startup', created_at },
    });
    createdCompanies.push(c);
  }

  const investors = [
    { name: 'Nordic Ventures', description: 'Nordic VC', headquarters: 'Stockholm', investment_focus: 'Fintech, SaaS', min_investment: 500000, max_investment: 5000000, is_verified: true, verification_tier: 'gold', created_at: monthsAgo(3) },
    { name: 'Stockholm Angel Network', description: 'Angel network', headquarters: 'Stockholm', investment_focus: 'Early-stage', min_investment: 100000, max_investment: 1000000, is_verified: true, verification_tier: 'silver', created_at: monthsAgo(1) },
  ];
  for (const i of investors) {
    const { created_at, ...rest } = i;
    const c = await prisma.company.create({
      data: { ...rest, company_type: 'investor', created_at },
    });
    createdCompanies.push(c);
  }

  await prisma.review.createMany({
    data: [
      { company_id: createdCompanies[0].id, content: 'Great experience', rating: 5, is_approved: true },
      { company_id: createdCompanies[1].id, content: 'Solid platform', rating: 4, is_approved: true },
      { company_id: createdCompanies[5].id, content: 'Innovative approach', rating: 5, is_approved: true },
      { company_id: createdCompanies[6].id, content: 'Needs improvement', rating: 3, is_approved: false },
      { company_id: createdCompanies[7].id, content: 'Excellent support', rating: 5, is_approved: true },
    ],
  });

  await prisma.report.createMany({
    data: [
      { type: 'content', content: 'Misleading description', status: 'pending', priority: 'High', company_id: createdCompanies[2].id },
      { type: 'spam', content: 'Promotional content', status: 'resolved', priority: 'Medium', company_id: createdCompanies[4].id },
      { type: 'content', content: 'Inappropriate image', status: 'pending', priority: 'High', company_id: createdCompanies[6].id },
      { type: 'harassment', content: 'Unprofessional conduct', status: 'escalated', priority: 'High', company_id: createdCompanies[8].id },
      { type: 'spam', content: 'Forum spam', status: 'dismissed', priority: 'Low', company_id: createdCompanies[1].id },
    ],
  });

  const byType = await prisma.company.groupBy({ by: ['company_type'], _count: true });
  console.log('Seed done. Companies:', byType);
  console.log('Users: not seeded. First to register becomes admin.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
