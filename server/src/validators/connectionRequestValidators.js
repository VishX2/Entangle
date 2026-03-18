const { z } = require('zod');

const createConnectionRequestSchema = z.object({
  to_company_id: z.coerce.number().int().positive('Company ID is required'),
  message: z.string().max(500).optional().nullable(),
});

const updateConnectionRequestSchema = z.object({
  status: z.enum(['pending', 'accepted', 'rejected']),
});

module.exports = { createConnectionRequestSchema, updateConnectionRequestSchema };
