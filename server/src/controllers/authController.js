const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { prisma } = require('../lib/prisma');
const config = require('../config');
const { sendPasswordResetEmail } = require('../services/emailService');

const INVESTMENT_RANGES = {
  '25k': { min: 25000, max: 100000 },
  '50k': { min: 0, max: 50000 },
  '100k': { min: 100000, max: 500000 },
  '500k': { min: 500000, max: 1000000 },
  '1m': { min: 1000000, max: 5000000 },
  '5m': { min: 5000000, max: 20000000 },
  'more': { min: 5000000, max: 50000000 },
  '50k-100k': { min: 50000, max: 100000 },
  '100k-500k': { min: 100000, max: 500000 },
  '500k-1m': { min: 500000, max: 1000000 },
  '1m+': { min: 1000000, max: 10000000 },
};

async function register(req, res, next) {
  try {
    const {
      email,
      password,
      first_name,
      last_name,
      user_type,
      company,
      phone,
      nic_id,
      reference_letter_url,
      profile_picture,
    } = req.body;

    const firstName = (first_name || '').trim();
    const lastName = (last_name || '').trim() || '.';

    const hash = await bcrypt.hash(password, 10);
    await prisma.role.upsert({ where: { id: 1 }, create: { id: 1, name: 'admin', description: 'Admin' }, update: {} });
    await prisma.role.upsert({ where: { id: 2 }, create: { id: 2, name: 'user', description: 'User' }, update: {} });

    const userData = {
      email,
      password_hash: hash,
      first_name: firstName,
      last_name: lastName,
      role_id: 2,
    };
    if (phone) userData.phone = String(phone).trim();
    if (nic_id) userData.nic_id = String(nic_id).trim();
    if (reference_letter_url) userData.reference_letter_url = String(reference_letter_url).trim();
    if (profile_picture) userData.profile_picture = String(profile_picture).trim();

    const user = await prisma.user.create({
      data: userData,
      select: { id: true, email: true, first_name: true, last_name: true, role_id: true, created_at: true, profile_picture: true },
    });

    const companyType = (user_type || '').toLowerCase();
    if (company && company.name && ['investor', 'startup', 'entrepreneur'].includes(companyType)) {
      const range = company.investmentRange || company.fundingRange || company.fundingNeeded;
      const rangeMap = INVESTMENT_RANGES[range] || null;

      const companyData = {
        name: company.name,
        company_type: companyType,
        description: company.description || company.investmentFocus || company.experience || null,
        website_url: company.website || company.website_url || company.linkedIn || null,
        headquarters: company.headquarters || null,
        founder_name: company.founderName || `${firstName} ${lastName}`.trim() || null,
        years_experience: company.yearsExperience != null ? parseInt(company.yearsExperience, 10) : null,
        investment_focus: company.investmentFocus || company.industries || company.industry || null,
        min_investment: rangeMap?.min ?? company.min_investment ?? null,
        max_investment: rangeMap?.max ?? company.max_investment ?? null,
        funding_stage: company.fundingStage || company.preferredStage || company.stage || null,
        team_size: company.teamSize != null ? parseInt(company.teamSize, 10) : null,
        created_by: user.id,
        updated_by: user.id,
      };
      if (company.business_registration_address) companyData.business_registration_address = String(company.business_registration_address).trim();
      if (company.patent_id) companyData.patent_id = String(company.patent_id).trim();
      if (company.logo_url) companyData.logo_url = String(company.logo_url).trim();

      await prisma.company.create({
        data: companyData,
      });
    }
    const safeUser = { ...user, user_type: ['investor', 'startup', 'entrepreneur'].includes(companyType) ? companyType : null };

    const token = jwt.sign(
      { userId: user.id, roleId: user.role_id },
      config.jwtSecret,
      { expiresIn: '7d' }
    );
    res.status(201).json({ user: safeUser, token });
  } catch (err) {
    if (err.code === 'P2002') return res.status(409).json({ error: 'Email already registered' });
    if (err.code === 'P2003' || err.message?.includes('Invalid enum')) {
      return res.status(400).json({ error: 'Invalid user_type. Use: investor, startup, entrepreneur' });
    }
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'email and password required' });
    }
    const user = await prisma.user.findFirst({
      where: { email, is_active: true },
      select: { id: true, email: true, password_hash: true, first_name: true, last_name: true, role_id: true, profile_picture: true },
    });
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    await prisma.user.update({
      where: { id: user.id },
      data: { last_login_at: new Date() },
    });
    const token = jwt.sign(
      { userId: user.id, roleId: user.role_id },
      config.jwtSecret,
      { expiresIn: '7d' }
    );
    const { password_hash: _, ...safeUser } = user;
    const profileCompany = await prisma.company.findFirst({
      where: { created_by: user.id },
      select: { company_type: true },
    });
    const user_type = profileCompany?.company_type ?? null;
    res.json({ user: { ...safeUser, user_type }, token });
  } catch (err) {
    next(err);
  }
}

async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;
    const user = await prisma.user.findFirst({
      where: { email: email.toLowerCase().trim(), is_active: true },
      select: { id: true, email: true, first_name: true },
    });
    if (!user) {
      return res.json({ message: 'If that email exists, we sent a reset link.' });
    }
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
    await prisma.passwordResetToken.create({
      data: { user_id: user.id, token, expires_at: expiresAt },
    });
    const resetLink = `${config.frontendUrl}/reset-password?token=${token}`;
    await sendPasswordResetEmail(user.email, resetLink, user.first_name);
    res.json({ message: 'If that email exists, we sent a reset link.' });
  } catch (err) {
    next(err);
  }
}

async function resetPassword(req, res, next) {
  try {
    const { token, password } = req.body;
    const record = await prisma.passwordResetToken.findFirst({
      where: { token, used_at: null },
      include: { user: true },
    });
    if (!record || new Date() > record.expires_at) {
      return res.status(400).json({ error: 'Invalid or expired reset link. Request a new one.' });
    }
    const hash = await bcrypt.hash(password, 10);
    await prisma.$transaction([
      prisma.user.update({
        where: { id: record.user_id },
        data: { password_hash: hash },
      }),
      prisma.passwordResetToken.update({
        where: { id: record.id },
        data: { used_at: new Date() },
      }),
    ]);
    res.json({ message: 'Password updated. You can now log in.' });
  } catch (err) {
    next(err);
  }
}

async function loginAdmin(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'email and password required' });
    }
    const user = await prisma.user.findFirst({
      where: { email, is_active: true },
      select: { id: true, email: true, password_hash: true, first_name: true, last_name: true, role_id: true },
    });
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    if (user.role_id !== 1) {
      return res.status(403).json({ error: 'Admin access only' });
    }
    await prisma.user.update({
      where: { id: user.id },
      data: { last_login_at: new Date() },
    });
    const token = jwt.sign(
      { userId: user.id, roleId: user.role_id },
      config.jwtSecret,
      { expiresIn: '7d' }
    );
    const { password_hash: _, ...safeUser } = user;
    res.json({ user: safeUser, token });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login, loginAdmin, forgotPassword, resetPassword };
