const { prisma } = require('../lib/prisma');

async function create(userId, { type, title, body, link }) {
  return prisma.notification.create({
    data: { user_id: userId, type: type || 'general', title, body: body || null, link: link || null },
  });
}

module.exports = { create };
