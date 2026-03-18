const { prisma } = require('../lib/prisma');
const config = require('../config');

function computeCompleteness(profile, company) {
  let score = 0;
  const checks = [];
  if (profile?.first_name) { score += 10; checks.push({ item: 'First name', done: true }); } else { checks.push({ item: 'First name', done: false }); }
  if (profile?.last_name) { score += 10; checks.push({ item: 'Last name', done: true }); } else { checks.push({ item: 'Last name', done: false }); }
  if (profile?.email) { score += 5; checks.push({ item: 'Email', done: true }); } else { checks.push({ item: 'Email', done: false }); }
  if (profile?.phone) { score += 5; checks.push({ item: 'Phone', done: true }); } else { checks.push({ item: 'Phone', done: false }); }
  if (profile?.profile_picture) { score += 10; checks.push({ item: 'Profile picture', done: true }); } else { checks.push({ item: 'Profile picture', done: false }); }
  if (company?.name) { score += 10; checks.push({ item: 'Company name', done: true }); } else { checks.push({ item: 'Company name', done: false }); }
  if (company?.description) { score += 15; checks.push({ item: 'Company description', done: true }); } else { checks.push({ item: 'Company description', done: false }); }
  if (company?.headquarters || company?.website_url) { score += 10; checks.push({ item: 'Location or website', done: true }); } else { checks.push({ item: 'Location or website', done: false }); }
  if (company?.investment_focus || company?.funding_stage) { score += 10; checks.push({ item: 'Investment focus or stage', done: true }); } else { checks.push({ item: 'Investment focus or stage', done: false }); }
  if (company?.team_size != null || company?.founded_year) { score += 5; checks.push({ item: 'Team size or founded year', done: true }); } else { checks.push({ item: 'Team size or founded year', done: false }); }
  return { score: Math.min(100, score), checks };
}

async function getGuidance(req, res, next) {
  try {
    const userId = req.userId;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, first_name: true, last_name: true, email: true, phone: true, profile_picture: true },
    });
    const company = await prisma.company.findFirst({
      where: { created_by: userId },
      select: { name: true, description: true, headquarters: true, website_url: true, investment_focus: true, funding_stage: true, team_size: true, founded_year: true },
    });
    const { score, checks } = computeCompleteness(user, company);
    const suggestions = checks.filter((c) => !c.done).map((c) => `Add ${c.item.toLowerCase()}`);
    res.json({
      completeness_score: score,
      checks,
      suggestions,
      message: score >= 80 ? 'Your profile looks great to investors!' : score >= 50 ? 'Add a few more details to stand out.' : 'Complete your profile to attract more investors.',
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getGuidance };
