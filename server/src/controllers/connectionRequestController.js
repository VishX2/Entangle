const { prisma } = require('../lib/prisma');
const { create: createNotification } = require('../services/notificationService');

// ===create connection request from user to company===
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

    // Prevent duplicate connection requests
    const existing = await prisma.connectionRequest.findUnique({
      where: {
        from_user_id_to_company_id: { from_user_id: fromUserId, to_company_id: toCompanyId },
      },
    });

    if (existing) {
      return res.status(409).json({ error: 'Connection request already sent', request: existing });
    }

    // Create new connection request
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

// ===list connection requests sent by the user===
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

// ===list all connection requests (admin)===
async function listAll(req, res, next) {
  try {
    const { status } = req.query;
    const where = {};

    if (status) where.status = status;
    
    // Fetch all connection requests with related user and company data
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

// ===update connection request status===
async function updateStatus(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    const { status } = req.body;

    if (!['pending', 'accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'status must be pending, accepted, or rejected' });
    }

    // Update connection request status
    const request = await prisma.connectionRequest.update({
      where: { id },
      data: { status, updated_at: new Date() },
      include: {
        fromUser: { select: { id: true, email: true, first_name: true, last_name: true } },
        toCompany: { select: { name: true, created_by: true } },
      },
    });

    // Send notification if request is accepted
    if (status === 'accepted') {
      await createNotification(request.from_user_id, {
        type: 'connection_accepted',
        title: 'Connection approved',
        body: `Your connection request to ${request.toCompany?.name || 'company'} was approved.`,
        link: '/investor/company/' + request.to_company_id,
      });
    }
    
    res.json(request);
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ error: 'Connection request not found' });
    next(err);
  }
}

module.exports = { create, listSent, listAll, updateStatus };
