/**
 * AI Matchmaking Service
 * Hybrid: rule-based scoring + OpenAI embeddings for semantic similarity.
 * When OPENAI_API_KEY is set, uses embeddings; otherwise rule-based only.
 */

const { getEmbeddingsBatch, cosineSimilarity, isEmbeddingsAvailable } = require('./embeddingsService');

function normalizeText(str) {
  if (!str || typeof str !== 'string') return '';
  return str.toLowerCase().trim().replace(/\s+/g, ' ');
}

function parseFocus(focusStr) {
  if (!focusStr) return [];
  const normalized = normalizeText(focusStr);
  return normalized.split(/[,;|]/).map(s => s.trim()).filter(Boolean);
}

function parseStages(stageStr) {
  if (!stageStr) return [];
  const normalized = normalizeText(stageStr);
  return normalized.split(/[,;·\s]+/).map(s => s.trim()).filter(Boolean);
}

function industryOverlap(startupFocus, investorFocus) {
  const s = parseFocus(startupFocus);
  const i = parseFocus(investorFocus);
  if (s.length === 0 || i.length === 0) return 0.5; // neutral if missing
  const overlap = s.filter(x => i.some(y => y.includes(x) || x.includes(y))).length;
  return Math.min(1, overlap / Math.max(s.length, i.length));
}

function stageMatch(startupStage, investorStage) {
  const sStages = parseStages(startupStage);
  const iStages = parseStages(investorStage);
  if (sStages.length === 0 || iStages.length === 0) return 0.6; // neutral
  const match = sStages.some(s => iStages.some(i => 
    s.includes(i) || i.includes(s) || 
    s.includes('seed') && i.includes('seed') ||
    s.includes('series') && i.includes('series')
  ));
  return match ? 1 : 0.3;
}

function checkSizeFit(startupAsk, investorMin, investorMax) {
  if (!investorMin && !investorMax) return 0.7; // unknown, neutral
  const ask = Number(startupAsk) || 0;
  const min = Number(investorMin) || 0;
  const max = Number(investorMax) || Infinity;
  if (ask <= 0) return 0.6;
  if (ask >= min && ask <= max) return 1;
  if (ask < min) return Math.max(0.2, 0.8 - (min - ask) / min * 0.5);
  return Math.max(0.2, 0.8 - (ask - max) / max * 0.5);
}

function locationMatch(startupLoc, investorLoc) {
  if (!startupLoc || !investorLoc) return 0.6;
  const s = normalizeText(startupLoc);
  const i = normalizeText(investorLoc);
  if (s === i) return 1;
  // Same region/country (simple heuristic)
  const sParts = s.split(/[,\s]+/);
  const iParts = i.split(/[,\s]+/);
  const overlap = sParts.filter(p => p.length > 2 && iParts.some(ip => ip.includes(p) || p.includes(ip))).length;
  return overlap > 0 ? 0.8 : 0.5;
}

function trustScore(company) {
  let score = 0.5;
  if (company.is_verified) score += 0.2;
  const tier = (company.verification_tier || 'none').toLowerCase();
  if (tier === 'gold') score += 0.2;
  else if (tier === 'silver') score += 0.15;
  else if (tier === 'bronze') score += 0.1;
  const rating = Number(company.average_rating) || 0;
  if (rating >= 4.5) score += 0.1;
  else if (rating >= 4) score += 0.05;
  return Math.min(1, score);
}

/**
 * Compute match score between a startup and an investor (0-100).
 * @param {Object} startup - Startup company
 * @param {Object} investor - Investor company
 * @returns {{ score: number, breakdown: Object }}
 */
function scoreMatch(startup, investor) {
  const industry = industryOverlap(startup.investment_focus, investor.investment_focus);
  const stage = stageMatch(startup.funding_stage, investor.funding_stage);
  const ask = startup.min_investment || startup.max_investment;
  const checkSize = checkSizeFit(ask, investor.min_investment, investor.max_investment);
  const location = locationMatch(startup.headquarters, investor.headquarters);
  const trust = trustScore(investor);

  const weights = {
    industry: 0.30,
    stage: 0.25,
    checkSize: 0.20,
    location: 0.10,
    trust: 0.15,
  };

  const raw = industry * weights.industry + stage * weights.stage + 
    checkSize * weights.checkSize + location * weights.location + trust * weights.trust;
  const score = Math.round(raw * 100);

  const breakdown = {
    industry: Math.round(industry * 100),
    stage: Math.round(stage * 100),
    checkSize: Math.round(checkSize * 100),
    location: Math.round(location * 100),
    trust: Math.round(trust * 100),
  };

  return { score: Math.min(100, Math.max(0, score)), breakdown };
}

/**
 * Rank investors for a given startup (sync, rule-based only).
 */
function rankInvestorsForStartup(startup, investors, limit = 20) {
  return investors
    .map(inv => {
      const { score, breakdown } = scoreMatch(startup, inv);
      return { company: inv, score, breakdown };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/**
 * Rank startups for a given investor (sync).
 */
function rankStartupsForInvestor(investor, startups, limit = 20) {
  return startups
    .map(s => {
      const { score, breakdown } = scoreMatch(s, investor);
      return { company: s, score, breakdown };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/**
 * Rank investors for a given entrepreneur (same logic as startup).
 */
function rankInvestorsForEntrepreneur(entrepreneur, investors, limit = 20) {
  return rankInvestorsForStartup(entrepreneur, investors, limit);
}

/**
 * Rank entrepreneurs for a given investor.
 */
function rankEntrepreneursForInvestor(investor, entrepreneurs, limit = 20) {
  return entrepreneurs
    .map(e => {
      const { score, breakdown } = scoreMatch(e, investor);
      return { company: e, score, breakdown };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/** Blend rule score with embedding similarity. RULE_WEIGHT + SEMANTIC_WEIGHT = 1 */
const RULE_WEIGHT = 0.5;
const SEMANTIC_WEIGHT = 0.5;

/**
 * Async: Rank investors for startup with optional OpenAI embeddings.
 */
async function rankInvestorsForStartupAsync(startup, investors, limit = 20) {
  const ruleMatches = rankInvestorsForStartup(startup, investors, limit);

  if (!isEmbeddingsAvailable()) {
    return ruleMatches;
  }

  const allParties = [startup, ...investors];
  const embeddingMap = await getEmbeddingsBatch(allParties);
  const startupEmb = embeddingMap.get(startup.id);
  if (!startupEmb) return ruleMatches;

  const withSemantic = ruleMatches.map(({ company, score, breakdown }) => {
    const invEmb = embeddingMap.get(company.id);
    const semanticScore = invEmb ? cosineSimilarity(startupEmb, invEmb) * 100 : 50;
    const blended = Math.round(RULE_WEIGHT * score + SEMANTIC_WEIGHT * semanticScore);
    return {
      company,
      score: Math.min(100, Math.max(0, blended)),
      breakdown: { ...breakdown, semantic: Math.round(semanticScore) },
    };
  });

  return withSemantic.sort((a, b) => b.score - a.score).slice(0, limit);
}

/**
 * Async: Rank startups for investor with optional embeddings.
 */
async function rankStartupsForInvestorAsync(investor, startups, limit = 20) {
  const ruleMatches = rankStartupsForInvestor(investor, startups, limit);

  if (!isEmbeddingsAvailable()) {
    return ruleMatches;
  }

  const allParties = [investor, ...startups];
  const embeddingMap = await getEmbeddingsBatch(allParties);
  const investorEmb = embeddingMap.get(investor.id);
  if (!investorEmb) return ruleMatches;

  const withSemantic = ruleMatches.map(({ company, score, breakdown }) => {
    const sEmb = embeddingMap.get(company.id);
    const semanticScore = sEmb ? cosineSimilarity(investorEmb, sEmb) * 100 : 50;
    const blended = Math.round(RULE_WEIGHT * score + SEMANTIC_WEIGHT * semanticScore);
    return {
      company,
      score: Math.min(100, Math.max(0, blended)),
      breakdown: { ...breakdown, semantic: Math.round(semanticScore) },
    };
  });

  return withSemantic.sort((a, b) => b.score - a.score).slice(0, limit);
}

/**
 * Async: Rank investors for entrepreneur.
 */
async function rankInvestorsForEntrepreneurAsync(entrepreneur, investors, limit = 20) {
  return rankInvestorsForStartupAsync(entrepreneur, investors, limit);
}

/**
 * Async: Rank entrepreneurs for investor.
 */
async function rankEntrepreneursForInvestorAsync(investor, entrepreneurs, limit = 20) {
  const ruleMatches = rankEntrepreneursForInvestor(investor, entrepreneurs, limit);

  if (!isEmbeddingsAvailable()) {
    return ruleMatches;
  }

  const allParties = [investor, ...entrepreneurs];
  const embeddingMap = await getEmbeddingsBatch(allParties);
  const investorEmb = embeddingMap.get(investor.id);
  if (!investorEmb) return ruleMatches;

  const withSemantic = ruleMatches.map(({ company, score, breakdown }) => {
    const eEmb = embeddingMap.get(company.id);
    const semanticScore = eEmb ? cosineSimilarity(investorEmb, eEmb) * 100 : 50;
    const blended = Math.round(RULE_WEIGHT * score + SEMANTIC_WEIGHT * semanticScore);
    return {
      company,
      score: Math.min(100, Math.max(0, blended)),
      breakdown: { ...breakdown, semantic: Math.round(semanticScore) },
    };
  });

  return withSemantic.sort((a, b) => b.score - a.score).slice(0, limit);
}

module.exports = {
  scoreMatch,
  rankInvestorsForStartup,
  rankStartupsForInvestor,
  rankInvestorsForEntrepreneur,
  rankEntrepreneursForInvestor,
  rankInvestorsForStartupAsync,
  rankStartupsForInvestorAsync,
  rankInvestorsForEntrepreneurAsync,
  rankEntrepreneursForInvestorAsync,
  isEmbeddingsAvailable,
};
