const { prisma } = require('../lib/prisma');

async function list(req, res, next) {
  try {
    const userId = req.userId;
    const { unread_only } = req.query;
    const where = { user_id: userId };
    if (unread_only === 'true') where.read_at = null;
    const notifications = await prisma.notification.findMany({
      where,
      orderBy: { created_at: 'desc' },
      take: 50,
    });
    res.json(notifications);
  } catch (err) {
    next(err);
  }
}

async function markRead(req, res, next) {
  try {
    const userId = req.userId;
    const id = parseInt(req.params.id, 10);
    const n = await prisma.notification.findFirst({
      where: { id, user_id: userId },
    });
    if (!n) return res.status(404).json({ error: 'Notification not found' });
    await prisma.notification.update({
      where: { id },
      data: { read_at: new Date() },
    });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}

async function markAllRead(req, res, next) {
  try {
    const userId = req.userId;
    await prisma.notification.updateMany({
      where: { user_id: userId, read_at: null },
      data: { read_at: new Date() },
    });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}

module.exports = { list, markRead, markAllRead };
