const { prisma } = require('../lib/prisma');

async function list(req, res, next) {
  try {
    const { status } = req.query;
    const where = {};
    if (status) where.status = status;
    const reports = await prisma.report.findMany({
      where,
      include: {
        company: { select: { id: true, name: true } },
        user: { select: { id: true, first_name: true, last_name: true, email: true } },
      },
      orderBy: { created_at: 'desc' },
    });
    const rows = reports.map((r) => ({
      id: r.id,
      type: r.type,
      content: r.content,
      status: r.status,
      priority: r.priority || 'Medium',
      company_id: r.company_id,
      company_name: r.company?.name,
      reporter: r.user ? `${r.user.first_name} ${r.user.last_name}` : 'Unknown',
      reporter_email: r.user?.email,
      created_at: r.created_at,
    }));
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    const report = await prisma.report.findUnique({
      where: { id },
      include: {
        company: { select: { id: true, name: true } },
        user: { select: { first_name: true, last_name: true, email: true } },
      },
    });
    if (!report) return res.status(404).json({ error: 'Report not found' });
    res.json({
      ...report,
      company_name: report.company?.name,
      reporter: report.user ? `${report.user.first_name} ${report.user.last_name}` : 'Unknown',
    });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    const { status, priority } = req.body;
    const data = {};
    if (status !== undefined) data.status = status;
    if (priority !== undefined) data.priority = priority;
    if (Object.keys(data).length === 0) return res.status(400).json({ error: 'No fields to update' });
    const report = await prisma.report.update({
      where: { id },
      data,
      include: {
        company: { select: { id: true, name: true } },
        user: { select: { id: true, first_name: true, last_name: true, email: true } },
      },
    });
    res.json({
      id: report.id,
      type: report.type,
      content: report.content,
      status: report.status,
      priority: report.priority || 'Medium',
      company_id: report.company_id,
      company_name: report.company?.name,
      reporter: report.user ? `${report.user.first_name} ${report.user.last_name}` : 'Unknown',
      reporter_email: report.user?.email,
      created_at: report.created_at,
    });
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ error: 'Report not found' });
    next(err);
  }
}

module.exports = { list, getById, update };
