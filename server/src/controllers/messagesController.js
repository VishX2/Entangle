const { prisma } = require('../lib/prisma');
const { create: createNotification } = require('../services/notificationService');
const { messagesPathForUser } = require('../lib/appPaths');

async function listConversations(req, res, next) {
  try {
    const userId = req.userId;
    const participants = await prisma.conversationParticipant.findMany({
      where: { user_id: userId },
      include: {
        conversation: {
          include: {
            participants: {
              where: { user_id: { not: userId } },
              include: {
                user: {
                  select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    email: true,
                    profile_picture: true,
                    companies_created: {
                      take: 3,
                      select: { name: true, company_type: true, logo_url: true },
                    },
                  },
                },
              },
            },
            messages: {
              orderBy: { created_at: 'desc' },
              take: 1,
            },
          },
        },
      },
      orderBy: { conversation: { updated_at: 'desc' } },
    });
    const convos = participants.map((p) => {
      const other = p.conversation.participants[0]?.user;
      const lastMsg = p.conversation.messages[0];
      const companies = other?.companies_created || [];
      const primaryCompany = companies.find((c) => c.company_type === 'startup') || companies.find((c) => c.company_type === 'investor') || companies[0];
      const displayName = primaryCompany?.name || `${other?.first_name || ""} ${other?.last_name || ""}`.trim() || "Unknown";
      const displayImage = primaryCompany?.logo_url || other?.profile_picture || null;
      return {
        id: p.conversation.id,
        other_user: other
          ? {
              id: other.id,
              name: displayName,
              email: other.email,
              profile_picture: displayImage,
              company_name: primaryCompany?.name || null,
              company_logo: primaryCompany?.logo_url || null,
            }
          : null,
        last_message: lastMsg ? { content: lastMsg.content?.slice(0, 80), created_at: lastMsg.created_at } : null,
        updated_at: p.conversation.updated_at,
      };
    });
    res.json(convos);
  } catch (err) {
    next(err);
  }
}

async function getOrCreateConversation(req, res, next) {
  try {
    const userId = req.userId;
    const otherUserId = parseInt(req.body.other_user_id || req.params.otherUserId, 10);
    if (!otherUserId || otherUserId === userId) {
      return res.status(400).json({ error: 'Valid other_user_id required' });
    }
    const other = await prisma.user.findUnique({ where: { id: otherUserId } });
    if (!other) return res.status(404).json({ error: 'User not found' });

    let conv = await prisma.conversation.findFirst({
      where: {
        AND: [
          { participants: { some: { user_id: userId } } },
          { participants: { some: { user_id: otherUserId } } },
        ],
      },
      include: { participants: true },
    });

    if (!conv) {
      conv = await prisma.conversation.create({
        data: {
          participants: {
            create: [{ user_id: userId }, { user_id: otherUserId }],
          },
        },
        include: { participants: true },
      });
    }

    const otherParticipant = conv.participants.find((p) => p.user_id !== userId);
    res.json({
      id: conv.id,
      other_user: otherParticipant
        ? {
            id: other.id,
            first_name: other.first_name,
            last_name: other.last_name,
            email: other.email,
            profile_picture: other.profile_picture || null,
          }
        : null,
    });
  } catch (err) {
    next(err);
  }
}

async function listMessages(req, res, next) {
  try {
    const userId = req.userId;
    const convId = parseInt(req.params.conversationId, 10);
    const participant = await prisma.conversationParticipant.findFirst({
      where: { conversation_id: convId, user_id: userId },
    });
    if (!participant) return res.status(403).json({ error: 'Not a participant' });

    const messages = await prisma.message.findMany({
      where: { conversation_id: convId },
      include: { sender: { select: { id: true, first_name: true, last_name: true } } },
      orderBy: { created_at: 'asc' },
    });
    const rows = messages.map((m) => ({
      ...m,
      sender_name: m.sender ? `${m.sender.first_name || ''} ${m.sender.last_name || ''}`.trim() : null,
      is_mine: m.sender_id === userId,
    }));
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function sendMessage(req, res, next) {
  try {
    const userId = req.userId;
    const convId = parseInt(req.params.conversationId, 10);
    const { content } = req.body;
    if (!content || !String(content).trim()) {
      return res.status(400).json({ error: 'Message content required' });
    }
    const participant = await prisma.conversationParticipant.findFirst({
      where: { conversation_id: convId, user_id: userId },
    });
    if (!participant) return res.status(403).json({ error: 'Not a participant' });

    const message = await prisma.message.create({
      data: { conversation_id: convId, sender_id: userId, content: String(content).trim() },
      include: { sender: { select: { id: true, first_name: true, last_name: true } } },
    });
    await prisma.conversation.update({
      where: { id: convId },
      data: { updated_at: new Date() },
    });
    const otherParticipants = await prisma.conversationParticipant.findMany({
      where: { conversation_id: convId, user_id: { not: userId } },
    });
    const sender = await prisma.user.findUnique({ where: { id: userId }, select: { first_name: true, last_name: true } });
    const senderName = sender ? `${sender.first_name || ''} ${sender.last_name || ''}`.trim() || 'Someone' : 'Someone';
    for (const p of otherParticipants) {
      const base = await messagesPathForUser(p.user_id);
      await createNotification(p.user_id, {
        type: 'new_message',
        title: `New message from ${senderName}`,
        body: String(content).trim().slice(0, 100),
        link: `${base}?conversation=${convId}`,
      });
    }
    res.status(201).json({
      ...message,
      sender_name: message.sender ? `${message.sender.first_name || ''} ${message.sender.last_name || ''}`.trim() : null,
      is_mine: true,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { listConversations, getOrCreateConversation, listMessages, sendMessage };
