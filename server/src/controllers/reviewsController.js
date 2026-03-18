const { prisma } = require('../lib/prisma');

const userSelect = { first_name: true, last_name: true, email: true };

async function listByCompany(req, res, next) {
  try {
    const companyId = parseInt(req.params.companyId, 10);
    const reviews = await prisma.review.findMany({
      where: { company_id: companyId, is_approved: true },
      include: { user: { select: { first_name: true, last_name: true } } },
      orderBy: { created_at: 'desc' },
    });
    const rows = reviews.map((r) => ({
      ...r,
      first_name: r.user?.first_name,
      last_name: r.user?.last_name,
      user: undefined,
    }));
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function list(req, res, next) {
  try {
    const { company_id, approved } = req.query;
    const where = {};
    if (company_id) where.company_id = parseInt(company_id, 10);
    if (approved !== undefined) where.is_approved = approved === 'true';
    const reviews = await prisma.review.findMany({
      where,
      include: {
        user: { select: userSelect },
        company: { select: { id: true, name: true } },
      },
      orderBy: { created_at: 'desc' },
    });
    const rows = reviews.map((r) => {
      const { user, company, ...rest } = r;
      return {
        ...rest,
        first_name: user?.first_name,
        last_name: user?.last_name,
        email: user?.email,
        company_name: company?.name,
      };
    });
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const review = await prisma.review.findUnique({
      where: { id: parseInt(req.params.id, 10) },
      include: { user: { select: userSelect } },
    });
    if (!review) return res.status(404).json({ error: 'Review not found' });
    const { user, ...r } = review;
    res.json({ ...r, first_name: user?.first_name, last_name: user?.last_name, email: user?.email });
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const { company_id, title, content, rating, pros, cons, is_anonymous } = req.body;
    if (!company_id || content === undefined || rating === undefined) {
      return res.status(400).json({ error: 'company_id, content, and rating required' });
    }
    if (rating < 1 || rating > 5) return res.status(400).json({ error: 'rating must be 1-5' });
    const review = await prisma.review.create({
      data: {
        company_id: parseInt(company_id, 10),
        user_id: req.userId,
        title: title || null,
        content,
        rating,
        pros: pros || null,
        cons: cons || null,
        is_anonymous: is_anonymous || false,
      },
    });
    res.status(201).json(review);
  } catch (err) {
    if (err.code === 'P2003') return res.status(404).json({ error: 'Company not found' });
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const { id } = req.params;
    const { title, content, rating, pros, cons, is_approved } = req.body;
    const data = {};
    if (title !== undefined) data.title = title;
    if (content !== undefined) data.content = content;
    if (rating !== undefined) {
      if (rating < 1 || rating > 5) return res.status(400).json({ error: 'rating must be 1-5' });
      data.rating = rating;
    }
    if (pros !== undefined) data.pros = pros;
    if (cons !== undefined) data.cons = cons;
    if (req.roleId === 1 && is_approved !== undefined) data.is_approved = is_approved;
    if (Object.keys(data).length === 0) return res.status(400).json({ error: 'No fields to update' });
    const isAdmin = req.roleId === 1;
    if (isAdmin) {
      const review = await prisma.review.update({
        where: { id: parseInt(id, 10) },
        data,
      });
      return res.json(review);
    }
    const result = await prisma.review.updateMany({
      where: { id: parseInt(id, 10), user_id: req.userId },
      data,
    });
    if (result.count === 0) return res.status(404).json({ error: 'Review not found' });
    const updated = await prisma.review.findUnique({ where: { id: parseInt(id, 10) } });
    res.json(updated);
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ error: 'Review not found' });
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    if (req.roleId === 1) {
      await prisma.review.delete({ where: { id } });
      return res.status(204).send();
    }
    const result = await prisma.review.deleteMany({
      where: { id, user_id: req.userId },
    });
    if (result.count === 0) return res.status(404).json({ error: 'Review not found' });
    res.status(204).send();
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ error: 'Review not found' });
    next(err);
  }
}

async function helpful(req, res, next) {
  try {
    const review = await prisma.review.update({
      where: { id: parseInt(req.params.id, 10) },
      data: { helpful_count: { increment: 1 } },
      select: { id: true, helpful_count: true },
    });
    res.json(review);
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ error: 'Review not found' });
    next(err);
  }
}

module.exports = { listByCompany, list, getById, create, update, remove, helpful };
