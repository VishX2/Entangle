/**
 * Seed: admin user, roles, companies, reviews, reports.
 * Run: npx prisma db push   then   npm run seed
 *
 * Admin is created from ADMIN_EMAIL and ADMIN_PASSWORD in .env.
 * If admin exists, password is updated (so you can change it).
 */
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const bcrypt = require('bcryptjs');
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

  // Admin user from env (required for first-time setup)
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@entangle.local';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123!';
  const adminHash = await bcrypt.hash(adminPassword, 10);
  await prisma.user.upsert({
    where: { email: adminEmail },
    create: {
      email: adminEmail,
      password_hash: adminHash,
      first_name: 'Admin',
      last_name: 'User',
      role_id: 1,
    },
    update: { password_hash: adminHash },
  });
  console.log('Admin user:', adminEmail);

  // Demo user for messaging (investor@demo.com / Test123!)
  const demoHash = await bcrypt.hash('Test123!', 10);
  const demoUser = await prisma.user.upsert({
    where: { email: 'investor@demo.com' },
    create: { email: 'investor@demo.com', password_hash: demoHash, first_name: 'Demo', last_name: 'Investor', role_id: 2 },
    update: {},
  });

  await prisma.message.deleteMany({});
  await prisma.conversationParticipant.deleteMany({});
  await prisma.conversation.deleteMany({});
  await prisma.notification.deleteMany({});
  await prisma.document.deleteMany({});
  await prisma.connectionRequest.deleteMany({});
  await prisma.report.deleteMany({});
  await prisma.review.deleteMany({});
  await prisma.company.deleteMany({});

  // Create company owner users for messaging (skip if email exists)
  const ownerEmails = [
    'sarah@greentech.io', 'michael@healthai.co', 'elena@flowpay.com', 'james@nordic.vc',
    'priya@angel.net', 'alex@fintech.se', 'maria@cleantech.eu', 'david@saas.io',
    'lisa@edtech.com', 'peter@logistics.co', 'anna@medtech.se', 'olaf@energy.dk',
  ];
  const ownerUsers = [];
  const userHash = await bcrypt.hash('Test123!', 10);
  for (const email of ownerEmails) {
    const u = await prisma.user.upsert({
      where: { email },
      create: { email, password_hash: userHash, first_name: email.split('@')[0], last_name: 'Owner', role_id: 2 },
      update: {},
    });
    ownerUsers.push(u);
  }

  const createdCompanies = [];
  const companyTypes = ['entrepreneur', 'startup', 'investor'];
  const cities = ['Stockholm', 'Copenhagen', 'Oslo', 'Berlin', 'London', 'Amsterdam', 'Paris', 'Mumbai', 'Singapore', 'New York', 'San Francisco', 'Toronto', 'Sydney', 'Tokyo', 'Dubai'];
  const stages = ['Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C'];
  const focuses = ['Fintech', 'HealthTech', 'CleanTech', 'AI/ML', 'SaaS', 'E-commerce', 'EdTech', 'Logistics', 'Cybersecurity', 'Biotech'];
  const adjectives = ['Smart', 'Next', 'Cloud', 'Data', 'Flow', 'Green', 'Health', 'Tech', 'Prime', 'Core', 'Nova', 'Apex', 'Vertex', 'Pulse', 'Spark'];
  const nouns = ['Solutions', 'Labs', 'Ventures', 'Capital', 'Systems', 'Works', 'Hub', 'Network', 'Studio', 'Group', 'Partners', 'Innovations', 'Dynamics', 'Logic', 'Forge'];

  // Create 100 companies
  for (let i = 0; i < 100; i++) {
    const type = companyTypes[i % 3];
    const owner = ownerUsers[i % ownerUsers.length];
    const name = `${adjectives[i % adjectives.length]} ${nouns[i % nouns.length]}${i < 15 ? '' : ' ' + (i + 1)}`;
    const data = {
      name,
      company_type: type,
      description: `${name} is a ${type} company focused on innovation.`,
      headquarters: cities[i % cities.length],
      founder_name: `${owner.first_name} ${owner.last_name}`,
      created_by: owner.id,
      is_verified: i % 3 !== 0,
      verification_tier: i % 3 === 0 ? 'bronze' : i % 3 === 1 ? 'silver' : 'gold',
      created_at: monthsAgo(i % 6),
    };
    if (type === 'startup') {
      data.funding_stage = stages[i % stages.length];
      data.investment_focus = focuses[i % focuses.length];
      data.team_size = 5 + (i % 20);
    } else if (type === 'investor') {
      data.investment_focus = focuses.slice(0, 2).join(', ');
      data.funding_stage = 'Seed, Series A';
      data.min_investment = 50000 * (1 + (i % 5));
      data.max_investment = 500000 * (1 + (i % 10));
    } else {
      data.years_experience = 3 + (i % 15);
    }
    const c = await prisma.company.create({ data });
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

  // Seed conversations and messages (demo user ↔ company owners)
  if (demoUser && ownerUsers.length >= 3) {
    const sampleMessages = [
      ['Hi, I saw your company profile. Interested in learning more.', 'Thanks for reaching out! Happy to discuss.'],
      ['Would you be open to a quick call this week?', 'Sure, how about Thursday?'],
      ['We have a potential partnership opportunity.', 'Sounds interesting! Tell me more.'],
      ['What are your typical investment terms?', 'We usually do seed rounds with 10-15% equity.'],
      ['Can you share your deck?', 'I\'ll send it over shortly.'],
    ];
    for (let i = 0; i < 6; i++) {
      const other = ownerUsers[i % ownerUsers.length];
      const conv = await prisma.conversation.create({
        data: {
          participants: {
            create: [{ user_id: demoUser.id }, { user_id: other.id }],
          },
        },
      });
      const msgs = sampleMessages[i % sampleMessages.length];
      for (let j = 0; j < msgs.length; j++) {
        await prisma.message.create({
          data: {
            conversation_id: conv.id,
            sender_id: j === 0 ? demoUser.id : other.id,
            content: msgs[j],
          },
        });
      }
    }
    console.log('Seeded 6 conversations with messages. Login as investor@demo.com / Test123! to see them.');
  }

  const byType = await prisma.company.groupBy({ by: ['company_type'], _count: true });
  console.log('Seed done. Companies:', byType);
  console.log('Admin:', adminEmail, '— use this to log in to the admin app.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
