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

/**
 * GET /matchmaking/startups-for-investor/:investorId
 * Returns ranked startups for an investor (AI matchmaking).
 */
async function startupsForInvestor(req, res, next) {
  try {
    const investorId = parseInt(req.params.investorId, 10);
    const limit = Math.min(parseInt(req.query.limit, 10) || 20, 50);

    const investor = await prisma.company.findUnique({
      where: { id: investorId, company_type: 'investor', is_active: true },
      select: selectFields,
    });
    if (!investor) {
      return res.status(404).json({ error: 'Investor not found' });
    }

    const startups = await prisma.company.findMany({
      where: { company_type: 'startup', is_active: true },
      select: selectFields,
    });

    const matches = await rankStartupsForInvestorAsync(investor, startups, limit);

    res.json({
      investor: { id: investor.id, name: investor.name },
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

/**
 * GET /matchmaking/investors-for-entrepreneur/:entrepreneurId
 * Returns ranked investors for an entrepreneur.
 */
async function investorsForEntrepreneur(req, res, next) {
  try {
    const entrepreneurId = parseInt(req.params.entrepreneurId, 10);
    const limit = Math.min(parseInt(req.query.limit, 10) || 20, 50);

    const entrepreneur = await prisma.company.findUnique({
      where: { id: entrepreneurId, company_type: 'entrepreneur', is_active: true },
      select: selectFields,
    });
    if (!entrepreneur) {
      return res.status(404).json({ error: 'Entrepreneur not found' });
    }

    const investors = await prisma.company.findMany({
      where: { company_type: 'investor', is_active: true },
      select: selectFields,
    });

    const matches = await rankInvestorsForEntrepreneurAsync(entrepreneur, investors, limit);

    res.json({
      entrepreneur: { id: entrepreneur.id, name: entrepreneur.name },
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

/**
 * GET /matchmaking/entrepreneurs-for-investor/:investorId
 * Returns ranked entrepreneurs for an investor.
 */
async function entrepreneursForInvestor(req, res, next) {
  try {
    const investorId = parseInt(req.params.investorId, 10);
    const limit = Math.min(parseInt(req.query.limit, 10) || 20, 50);

    const investor = await prisma.company.findUnique({
      where: { id: investorId, company_type: 'investor', is_active: true },
      select: selectFields,
    });
    if (!investor) {
      return res.status(404).json({ error: 'Investor not found' });
    }

    const entrepreneurs = await prisma.company.findMany({
      where: { company_type: 'entrepreneur', is_active: true },
      select: selectFields,
    });

    const matches = await rankEntrepreneursForInvestorAsync(investor, entrepreneurs, limit);

    res.json({
      investor: { id: investor.id, name: investor.name },
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

module.exports = {
  investorsForStartup,
  startupsForInvestor,
  investorsForEntrepreneur,
  entrepreneursForInvestor,
};
