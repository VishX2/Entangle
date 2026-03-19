const { z } = require('zod');

const updateReportSchema = z.object({
  status: z.string().max(50).optional(),
  priority: z.string().max(20).optional(),
}).refine((data) => Object.keys(data).length > 0, { message: 'No fields to update' });

module.exports = { updateReportSchema };
