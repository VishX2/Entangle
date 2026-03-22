const { prisma } = require('../lib/prisma');
const { create: createNotification } = require('../services/notificationService');
const {
  companyProfilePathForUser,
  connectionRequestsPathForUser,
} = require('../lib/appPaths');

async function create(req, res, next) {
  try {
    const { to_company_id, message } = req.body;
    const fromUserId = req.userId;

    if (!to_company_id) {
      return res.status(400).json({ error: 'to_company_id is required' });
    }
    const toCompanyId = parseInt(to_company_id, 10);

    const company = await prisma.company.findUnique({ where: { id: toCompanyId } });

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    const existing = await prisma.connectionRequest.findUnique({
      where: {
        from_user_id_to_company_id: { from_user_id: fromUserId, to_company_id: toCompanyId },
      },
    });

    if (existing) {
      return res.status(409).json({ error: 'Connection request already sent', request: existing });
    }

    const request = await prisma.connectionRequest.create({
      data: {
        from_user_id: fromUserId,
        to_company_id: toCompanyId,
        message: message || null,
      },
      include: {
        toCompany: { select: { id: true, name: true } },
      },
    });

    res.status(201).json(request);
  } catch (err) {
    next(err);
  }
}

async function listSent(req, res, next) {
  try {
    const requests = await prisma.connectionRequest.findMany({
      where: { from_user_id: req.userId },
      include: {
        toCompany: { select: { id: true, name: true, company_type: true, headquarters: true } },
      },
      orderBy: { created_at: 'desc' },
    });

    res.json(requests);
  } catch (err) {
    next(err);
  }
}

/** Incoming requests where admin approved and the recipient (company owner) must respond */
async function listIncoming(req, res, next) {
  try {
    const owned = await prisma.company.findMany({
      where: { created_by: req.userId, is_active: true },
      select: { id: true },
    });
    const companyIds = owned.map((c) => c.id);
    if (companyIds.length === 0) {
      return res.json([]);
    }
    const requests = await prisma.connectionRequest.findMany({
      where: {
        status: 'awaiting_recipient',
        to_company_id: { in: companyIds },
      },
      include: {
        fromUser: {
          select: { id: true, email: true, first_name: true, last_name: true, profile_picture: true },
        },
        toCompany: { select: { id: true, name: true, company_type: true, headquarters: true } },
      },
      orderBy: { updated_at: 'desc' },
    });
    res.json(requests);
  } catch (err) {
    next(err);
  }
}

async function listAll(req, res, next) {
  try {
    const { status } = req.query;
    const where = {};

    if (status) where.status = status;

    const requests = await prisma.connectionRequest.findMany({
      where,
      include: {
        fromUser: { select: { id: true, email: true, first_name: true, last_name: true } },
        toCompany: { select: { id: true, name: true, company_type: true, headquarters: true } },
      },
      orderBy: { created_at: 'desc' },
    });

    const rows = requests.map((r) => {
      const { fromUser, toCompany, ...rest } = r;
      return {
        ...rest,
        from_email: fromUser?.email,
        from_name: fromUser ? `${fromUser.first_name || ''} ${fromUser.last_name || ''}`.trim() : null,
        to_company_name: toCompany?.name,
        to_company_type: toCompany?.company_type,
      };
    });

    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function updateStatus(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    const { status } = req.body;

    const allowed = ['pending', 'rejected', 'awaiting_recipient'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ error: 'status must be pending, rejected, or awaiting_recipient' });
    }

    const request = await prisma.connectionRequest.update({
      where: { id },
      data: { status, updated_at: new Date() },
      include: {
        fromUser: { select: { id: true, email: true, first_name: true, last_name: true } },
        toCompany: { select: { name: true, created_by: true, id: true } },
      },
    });

    const fromName =
      request.fromUser ? `${request.fromUser.first_name || ''} ${request.fromUser.last_name || ''}`.trim() || 'Someone' : 'Someone';

    if (status === 'rejected') {
      await createNotification(request.from_user_id, {
        type: 'connection_rejected',
        title: 'Connection request not approved',
        body: `Your request to connect with ${request.toCompany?.name || 'the company'} was not approved.`,
        link: await connectionRequestsPathForUser(request.from_user_id),
      });
    }

    if (status === 'awaiting_recipient') {
      const ownerId = request.toCompany?.created_by;
      const toName = request.toCompany?.name || 'company';

      await createNotification(request.from_user_id, {
        type: 'connection_admin_ok',
        title: 'Request approved — waiting for response',
        body: `Your connection request to ${toName} was approved. The company will confirm the connection.`,
        link: await connectionRequestsPathForUser(request.from_user_id),
      });

      if (ownerId) {
        await createNotification(ownerId, {
          type: 'connection_pending_recipient',
          title: 'Approve a connection',
          body: `${fromName} wants to connect with ${toName}. Accept or decline.`,
          link: await connectionRequestsPathForUser(ownerId),
        });
      }
    }

    res.json(request);
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ error: 'Connection request not found' });
    next(err);
  }
}

async function respond(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    const { action } = req.body;

    if (!['accept', 'decline'].includes(action)) {
      return res.status(400).json({ error: 'action must be accept or decline' });
    }

    const request = await prisma.connectionRequest.findUnique({
      where: { id },
      include: {
        fromUser: { select: { id: true, first_name: true, last_name: true } },
        toCompany: { select: { id: true, name: true, company_type: true, created_by: true } },
      },
    });

    if (!request) return res.status(404).json({ error: 'Connection request not found' });
    if (request.status !== 'awaiting_recipient') {
      return res.status(400).json({ error: 'This request is not waiting for your response' });
    }
    if (request.toCompany.created_by !== req.userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const fromName =
      `${request.fromUser?.first_name || ''} ${request.fromUser?.last_name || ''}`.trim() || 'Someone';
    const toName = request.toCompany.name || 'company';

    if (action === 'decline') {
      await prisma.connectionRequest.update({
        where: { id },
        data: { status: 'recipient_declined', updated_at: new Date() },
      });
      await createNotification(request.from_user_id, {
        type: 'connection_declined',
        title: 'Connection declined',
        body: `${toName} declined your connection request.`,
        link: await connectionRequestsPathForUser(request.from_user_id),
      });
      return res.json({ ok: true, status: 'recipient_declined' });
    }

    await prisma.connectionRequest.update({
      where: { id },
      data: { status: 'accepted', updated_at: new Date() },
    });

    const fromCompany = await prisma.company.findFirst({
      where: { created_by: request.from_user_id, is_active: true },
      select: { id: true },
      orderBy: { created_at: 'asc' },
    });
    const fromCompanyId = fromCompany?.id;

    const linkForRequester = await companyProfilePathForUser(request.from_user_id, request.to_company_id);
    const linkForRecipient = fromCompanyId
      ? await companyProfilePathForUser(request.toCompany.created_by, fromCompanyId)
      : await connectionRequestsPathForUser(request.toCompany.created_by);

    await createNotification(request.from_user_id, {
      type: 'connection_accepted',
      title: "You're connected",
      body: `You and ${toName} are now connected.`,
      link: linkForRequester,
    });

    await createNotification(request.toCompany.created_by, {
      type: 'connection_accepted',
      title: "You're connected",
      body: `You and ${fromName} are now connected.`,
      link: linkForRecipient,
    });

    res.json({ ok: true, status: 'accepted' });
  } catch (err) {
    next(err);
  }
}

module.exports = { create, listSent, listIncoming, listAll, updateStatus, respond };
