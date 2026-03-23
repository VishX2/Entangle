const { z } = require('zod');

/** All statuses stored on ConnectionRequest (admin PATCH may only set a subset — see updateConnectionRequestSchema). */
const listableConnectionStatuses = [
  'pending',
  'rejected',
  'awaiting_recipient',
  'accepted',
  'recipient_declined',
];

const createConnectionRequestSchema = z.object({
  to_company_id: z.coerce.number().int().positive('Company ID is required'),
  message: z.string().max(500).optional().nullable(),
});

/** Admin-only PATCH: approve (awaiting_recipient) or reject; cannot set accepted (that is recipient respond flow). */
const updateConnectionRequestSchema = z.object({
  status: z.enum(['pending', 'rejected', 'awaiting_recipient']),
});

/** GET /connection-requests?status=… — filters must allow every DB status the UI uses (e.g. Connected = accepted). */
const listConnectionRequestsQuerySchema = z.object({
  status: z.preprocess(
    (v) => (v === '' || v === undefined || v === null ? undefined : v),
    z.enum(listableConnectionStatuses).optional()
  ),
});

const respondConnectionRequestSchema = z.object({
  action: z.enum(['accept', 'decline']),
});

module.exports = {
  createConnectionRequestSchema,
  updateConnectionRequestSchema,
  listConnectionRequestsQuerySchema,
  respondConnectionRequestSchema,
};
