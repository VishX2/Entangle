const { prisma } = require('../lib/prisma');
const {
  rankInvestorsForStartupAsync,
  rankStartupsForInvestorAsync,
  rankInvestorsForEntrepreneurAsync,
  rankEntrepreneursForInvestorAsync,
  isEmbeddingsAvailable,
} = require('../services/aiMatchingService');

const selectFields = {
  id: true, name: true, company_type: true, description: true, logo_url: true, website_url: true,
  headquarters: true, founded_year: true, is_verified: true, verification_tier: true, is_active: true,
  founder_name: true, years_experience: true, investment_focus: true, min_investment: true, max_investment: true,
  funding_stage: true, team_size: true, total_reviews: true, average_rating: true,
  created_at: true,
};

/**
 * GET /matchmaking/investors-for-startup/:startupId
 * Returns ranked investors for a startup (AI matchmaking).
 */
async function investorsForStartup(req, res, next) {
  try {
    const startupId = parseInt(req.params.startupId, 10);
    const limit = Math.min(parseInt(req.query.limit, 10) || 20, 50);

    const startup = await prisma.company.findUnique({
      where: { id: startupId, company_type: 'startup', is_active: true },
      select: selectFields,
    });
    if (!startup) {
      return res.status(404).json({ error: 'Startup not found' });
    }

    const investors = await prisma.company.findMany({
      where: { company_type: 'investor', is_active: true },
      select: selectFields,
    });

    const matches = await rankInvestorsForStartupAsync(startup, investors, limit);

    res.json({
      startup: { id: startup.id, name: startup.name },
      aiEnabled: isEmbeddingsAvailable(),
      matches: matches.map(({ company, score, breakdown }) => ({
        company,
        score,
        breakdown,
      })),
    });
  } catch (err) {
    next(err);
  }
}