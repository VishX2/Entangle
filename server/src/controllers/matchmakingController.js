const { prisma } = require('../lib/prisma');
const {
  rankInvestorsForStartupAsync,
  rankStartupsForInvestorAsync,
  rankInvestorsForEntrepreneurAsync,
  rankEntrepreneursForInvestorAsync,
  isEmbeddingsAvailable,
} = require('../services/aiMatchingService');
const {
  getEmbeddingForQuery,
  getEmbeddingsBatch,
  cosineSimilarity,
  buildProfileText,
} = require('../services/embeddingsService');

const selectFields = {
  id: true, name: true, company_type: true, description: true, logo_url: true, website_url: true,
  headquarters: true, founded_year: true, is_verified: true, verification_tier: true, is_active: true,
  founder_name: true, years_experience: true, investment_focus: true, min_investment: true, max_investment: true,
  funding_stage: true, team_size: true, total_reviews: true, average_rating: true,
  created_by: true, created_at: true,
};

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

async function searchByPrompt(req, res, next) {
  try {
    const query = (req.body?.prompt || req.body?.q || req.query?.q || req.query?.prompt || '').trim();
    const limit = Math.min(parseInt(req.query?.limit, 10) || 20, 50);
    const typeFilter = req.query?.type || req.body?.type;

    if (!query) {
      return res.status(400).json({ error: 'Query (prompt or q) is required' });
    }

    const where = { is_active: true };
    if (typeFilter && ['investor', 'startup', 'entrepreneur'].includes(String(typeFilter).toLowerCase())) {
      where.company_type = typeFilter.toLowerCase();
    }

    const companies = await prisma.company.findMany({
      where,
      select: selectFields,
    });

    if (companies.length === 0) {
      return res.json({ matches: [], aiEnabled: false, query });
    }

    const queryEmbedding = await getEmbeddingForQuery(query);

    if (queryEmbedding) {
      const embeddingMap = await getEmbeddingsBatch(companies);
      const scored = companies
        .map((c) => {
          const emb = embeddingMap.get(c.id);
          const score = emb ? cosineSimilarity(queryEmbedding, emb) * 100 : 0;
          return { company: c, score: Math.round(score) };
        })
        .filter((x) => x.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);

      return res.json({
        matches: scored,
        aiEnabled: true,
        query,
      });
    }

    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    const scored = companies
      .map((c) => {
        const text = buildProfileText(c).toLowerCase();
        let hits = 0;
        for (const term of terms) {
          if (term.length >= 2 && text.includes(term)) hits++;
        }
        const score = terms.length > 0 ? Math.round((hits / terms.length) * 100) : 0;
        return { company: c, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    res.json({
      matches: scored.length > 0 ? scored : companies.slice(0, limit).map((c) => ({ company: c, score: 50 })),
      aiEnabled: false,
      query,
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
  searchByPrompt,
};
