const { z } = require('zod');

const createReviewSchema = z.object({
  company_id: z.coerce.number().int().positive('Company ID is required'),
  title: z.string().max(255).optional().nullable(),
  content: z.string().min(1, 'Content is required'),
  rating: z.number().int().min(1, 'Rating must be 1-5').max(5, 'Rating must be 1-5'),
  pros: z.string().optional().nullable(),
  cons: z.string().optional().nullable(),
  is_anonymous: z.boolean().optional(),
});

const updateReviewSchema = z.object({
  title: z.string().max(255).optional().nullable(),
  content: z.string().optional(),
  rating: z.number().int().min(1).max(5).optional(),
  pros: z.string().optional().nullable(),
  cons: z.string().optional().nullable(),
  is_approved: z.boolean().optional(),
}).refine((data) => Object.keys(data).length > 0, { message: 'No fields to update' });

module.exports = { createReviewSchema, updateReviewSchema };
