const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { prisma } = require('../lib/prisma');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

async function register(req, res, next) {
  try {
    const { email, password, first_name, last_name } = req.body;
    if (!email || !password || !first_name || !last_name) {
      return res.status(400).json({ error: 'email, password, first_name, last_name required' });
    }
    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      return res.status(400).json({ error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` });
    }
    const hash = await bcrypt.hash(password, 10);
    // Ensure roles exist (needed after fresh db push)
    await prisma.role.upsert({ where: { id: 1 }, create: { id: 1, name: 'admin', description: 'Admin' }, update: {} });
    await prisma.role.upsert({ where: { id: 2 }, create: { id: 2, name: 'user', description: 'User' }, update: {} });
    const userCount = await prisma.user.count();
    const roleId = userCount === 0 ? 1 : 2; // First registrant becomes admin
    const user = await prisma.user.create({
      data: {
        email,
        password_hash: hash,
        first_name,
        last_name,
        role_id: roleId,
      },
      select: { id: true, email: true, first_name: true, last_name: true, role_id: true, created_at: true },
    });
    const token = jwt.sign(
      { userId: user.id, roleId: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.status(201).json({ user, token });
  } catch (err) {
    if (err.code === 'P2002') return res.status(409).json({ error: 'Email already registered' });
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
      select: { id: true, email: true, password_hash: true, first_name: true, last_name: true, role_id: true },
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
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    const { password_hash: _, ...safeUser } = user;
    res.json({ user: safeUser, token });
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
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    const { password_hash: _, ...safeUser } = user;
    res.json({ user: safeUser, token });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login, loginAdmin };
