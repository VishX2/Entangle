const { prisma } = require('./prisma');

/**
 * Primary app URL segment (investor | startup | entrepreneur) from user's companies.
 */
async function primaryAppSegmentForUser(userId) {
  const companies = await prisma.company.findMany({
    where: { created_by: userId, is_active: true },
    select: { company_type: true },
    orderBy: { created_at: 'asc' },
  });
  const types = companies.map((c) => c.company_type);
  if (types.includes('investor')) return 'investor';
  if (types.includes('startup')) return 'startup';
  if (types.includes('entrepreneur')) return 'entrepreneur';
  return 'investor';
}

async function messagesPathForUser(userId) {
  const seg = await primaryAppSegmentForUser(userId);
  return `/${seg}/messages`;
}

async function companyProfilePathForUser(userId, targetCompanyId) {
  const seg = await primaryAppSegmentForUser(userId);
  return `/${seg}/company/${targetCompanyId}`;
}

async function connectionRequestsPathForUser(userId) {
  const seg = await primaryAppSegmentForUser(userId);
  if (seg === 'investor') return '/investor/requests';
  if (seg === 'startup') return '/startup/requests';
  return '/entrepreneur/requests';
}

module.exports = {
  primaryAppSegmentForUser,
  messagesPathForUser,
  companyProfilePathForUser,
  connectionRequestsPathForUser,
};
