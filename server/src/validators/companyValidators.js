const { z } = require('zod');

const companyTypeEnum = z.enum(['entrepreneur', 'investor', 'startup']);
const verificationTierEnum = z.enum(['gold', 'silver', 'bronze', 'none']);

const createCompanySchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  company_type: companyTypeEnum,
  description: z.string().max(5000).optional().nullable(),
  logo_url: z.union([z.string().url(), z.literal('')]).optional().nullable(),
  website_url: z.union([z.string().url(), z.literal('')]).optional().nullable(),
  headquarters: z.string().max(255).optional().nullable(),
  founded_year: z.number().int().min(1800).max(2100).optional().nullable(),
  founder_name: z.string().max(255).optional().nullable(),
  years_experience: z.number().int().min(0).optional().nullable(),
  investment_focus: z.string().optional().nullable(),
  min_investment: z.number().optional().nullable(),
  max_investment: z.number().optional().nullable(),
  funding_stage: z.string().max(100).optional().nullable(),
  team_size: z.number().int().min(0).optional().nullable(),
  is_verified: z.boolean().optional(),
  verification_tier: verificationTierEnum.optional().nullable(),
});

const updateCompanySchema = z.object({
  name: z.string().min(1).max(255).optional(),
  company_type: companyTypeEnum.optional(),
  description: z.string().max(5000).optional().nullable(),
  logo_url: z.union([z.string().url(), z.literal('')]).optional().nullable(),
  website_url: z.union([z.string().url(), z.literal('')]).optional().nullable(),
  headquarters: z.string().max(255).optional().nullable(),
  founded_year: z.number().int().min(1800).max(2100).optional().nullable(),
  founder_name: z.string().max(255).optional().nullable(),
  years_experience: z.number().int().min(0).optional().nullable(),
  investment_focus: z.string().optional().nullable(),
  min_investment: z.number().optional().nullable(),
  max_investment: z.number().optional().nullable(),
  funding_stage: z.string().max(100).optional().nullable(),
  team_size: z.number().int().min(0).optional().nullable(),
  is_verified: z.boolean().optional(),
  verification_tier: verificationTierEnum.optional().nullable(),
  is_active: z.boolean().optional(),
}).refine((data) => Object.keys(data).length > 0, { message: 'No fields to update' });

const updateOwnCompanySchema = z.object({
  name: z.string().min(1).max(255).optional(),
  description: z.string().max(5000).optional().nullable(),
  logo_url: z.union([z.string().url(), z.literal('')]).optional().nullable(),
  /** Allow partial URLs (e.g. linkedin.com/...) — client may normalize */
  website_url: z.union([z.string().max(500), z.literal('')]).optional().nullable(),
  headquarters: z.string().max(255).optional().nullable(),
  founded_year: z.number().int().min(1800).max(2100).optional().nullable(),
  founder_name: z.string().max(255).optional().nullable(),
  years_experience: z.number().int().min(0).optional().nullable(),
  investment_focus: z.string().optional().nullable(),
  min_investment: z.number().optional().nullable(),
  max_investment: z.number().optional().nullable(),
  funding_stage: z.string().max(100).optional().nullable(),
  team_size: z.number().int().min(0).optional().nullable(),
}).refine((data) => Object.keys(data).length > 0, { message: 'No fields to update' });

module.exports = { createCompanySchema, updateCompanySchema, updateOwnCompanySchema };
