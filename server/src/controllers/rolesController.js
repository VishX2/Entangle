const { prisma } = require('../lib/prisma');

async function list(req, res, next) {
  try {
    const roles = await prisma.role.findMany({
      select: { id: true, name: true, description: true, created_at: true },
      orderBy: { id: 'asc' },
    });
    res.json(roles);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const role = await prisma.role.findUnique({
      where: { id: parseInt(req.params.id, 10) },
      select: { id: true, name: true, description: true, created_at: true },
    });
    if (!role) return res.status(404).json({ error: 'Role not found' });
    res.json(role);
  } catch (err) {
    next(err);
  }
}

module.exports = { list, getById };
