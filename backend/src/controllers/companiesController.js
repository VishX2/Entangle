const { prisma } = require('../lib/prisma');

// Fields that will be returned in API responses
const selectFields = {
  id: true, name: true, company_type: true, description: true, logo_url: true, website_url: true,
  headquarters: true, founded_year: true, is_verified: true, verification_tier: true, is_active: true,
  founder_name: true, years_experience: true, investment_focus: true, min_investment: true, max_investment: true,
  funding_stage: true, team_size: true, total_reviews: true, average_rating: true,
  created_by: true, updated_by: true, created_at: true, updated_at: true,
};

// Get list of companies with optional filters
async function list(req, res, next) {
  try {
    const { type, verified, active } = req.query;
    const where = {};
    if (type) where.company_type = type;
    if (verified !== undefined) where.is_verified = verified === 'true';
    if (active !== undefined) where.is_active = active === 'true';
    if (!req.roleId || req.roleId !== 1) where.is_active = true;
    const list = await prisma.company.findMany({
      where,
      select: selectFields,
      orderBy: [{ average_rating: 'desc' }, { created_at: 'desc' }],
    });
    res.json(list);
  } catch (err) {
    next(err);
  }
}

// Get summarized company data from database view
async function summary(req, res, next) {
  try {
    const { type, verified } = req.query;
    let where = '';
    const params = [];
    let i = 1;
    if (type) { where += (where ? ' AND ' : '') + `company_type = $${i++}`; params.push(type); }
    if (verified !== undefined) { where += (where ? ' AND ' : '') + `is_verified = $${i++}`; params.push(verified === 'true'); }
    const sql = where ? `SELECT * FROM company_summary WHERE ${where} ORDER BY average_rating DESC` : 'SELECT * FROM company_summary ORDER BY average_rating DESC';
    const rows = await prisma.$queryRawUnsafe(sql, ...params);
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

// Get a single company by ID
async function getById(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    const company = await prisma.company.findUnique({
      where: { id },
      select: selectFields,
    });
    if (!company) return res.status(404).json({ error: 'Company not found' });
    if (!company.is_active && req.roleId !== 1) return res.status(404).json({ error: 'Company not found' });
    res.json(company);
  } catch (err) {
    next(err);
  }
}

// Create a new company record
async function create(req, res, next) {
  try {
    const {
      name, company_type, description, logo_url, website_url, headquarters, founded_year,
      founder_name, years_experience, investment_focus, min_investment, max_investment,
      funding_stage, team_size, is_verified, verification_tier,
    } = req.body;
    if (!name || !company_type) return res.status(400).json({ error: 'name and company_type required' });
    const company = await prisma.company.create({
      data: {
        name,
        company_type,
        description: description || null,
        logo_url: logo_url || null,
        website_url: website_url || null,
        headquarters: headquarters || null,
        founded_year: founded_year ?? null,
        founder_name: founder_name || null,
        years_experience: years_experience ?? null,
        investment_focus: investment_focus || null,
        min_investment: min_investment != null ? min_investment : null,
        max_investment: max_investment != null ? max_investment : null,
        funding_stage: funding_stage || null,
        team_size: team_size ?? null,
        is_verified: is_verified ?? false,
        verification_tier: verification_tier || null,

        // Track who created and last updated the record
        created_by: req.userId,
        updated_by: req.userId,
      },
      select: selectFields,
    });
    res.status(201).json(company);
  } catch (err) {
    if (err.code === 'P2003' || err.message?.includes('Invalid enum')) return res.status(400).json({ error: 'Invalid company_type. Use: entrepreneur, investor, startup' });
    next(err);
  }
}

// Update an existing company
async function update(req, res, next) {
  try {
    const { id } = req.params;
    const {
      name, company_type, description, logo_url, website_url, headquarters, founded_year,
      is_verified, verification_tier, is_active, founder_name, years_experience, investment_focus,
      min_investment, max_investment, funding_stage, team_size,
    } = req.body;

    const data = {};
    // Only update fields that are provided
    if (name !== undefined) data.name = name;
    if (company_type !== undefined) data.company_type = company_type;
    if (description !== undefined) data.description = description;
    if (logo_url !== undefined) data.logo_url = logo_url;
    if (website_url !== undefined) data.website_url = website_url;
    if (headquarters !== undefined) data.headquarters = headquarters;
    if (founded_year !== undefined) data.founded_year = founded_year;
    if (is_verified !== undefined) data.is_verified = is_verified;
    if (verification_tier !== undefined) data.verification_tier = verification_tier;
    if (is_active !== undefined) data.is_active = is_active;
    if (founder_name !== undefined) data.founder_name = founder_name;
    if (years_experience !== undefined) data.years_experience = years_experience;
    if (investment_focus !== undefined) data.investment_focus = investment_focus;
    if (min_investment !== undefined) data.min_investment = min_investment;
    if (max_investment !== undefined) data.max_investment = max_investment;
    if (funding_stage !== undefined) data.funding_stage = funding_stage;
    if (team_size !== undefined) data.team_size = team_size;

    if (Object.keys(data).length === 0) 
        return res.status(400).json({ error: 'No fields to update' });

    data.updated_by = req.userId;

    const company = await prisma.company.update({
      where: { id: parseInt(id, 10) },
      data,
      select: selectFields,
    });
    res.json(company);
  } catch (err) {
    if (err.code === 'P2025') 
        return res.status(404).json({ error: 'Company not found' });
    next(err);
  }
}

// Soft delete a company by marking it as inactive
async function remove(req, res, next) {
  try {
    await prisma.company.update({
      where: { id: parseInt(req.params.id, 10) },
      data: { is_active: false, updated_by: req.userId },
    });
    res.status(204).send();
  } catch (err) {
    if (err.code === 'P2025') 
        return res.status(404).json({ error: 'Company not found' });
    next(err);
  }
}

module.exports = { list, summary, getById, create, update, remove };
