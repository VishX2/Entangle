const { z } = require('zod');

const emailSchema = z.string().email('Invalid email format').min(1, 'Email is required');
const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');

const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  first_name: z.string().min(1, 'First name is required').max(100),
  last_name: z.string().max(100).optional(),
  user_type: z.enum(['investor', 'startup', 'entrepreneur']).optional(),
  company: z.record(z.string(), z.unknown()).optional(),
});

const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

const forgotPasswordSchema = z.object({
  email: emailSchema,
});

const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

module.exports = { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema };
