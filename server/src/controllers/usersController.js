const bcrypt = require('bcryptjs');
const { prisma } = require('../lib/prisma');

const selectPublic = { id: true, email: true, first_name: true, last_name: true, profile_picture: true, phone: true, role_id: true, is_active: true, last_login_at: true, created_at: true, updated_at: true };

async function getMe(req, res, next) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: selectPublic,
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
}

async function updateMe(req, res, next) {
  try {
    const { first_name, last_name, profile_picture, phone, nic_id } = req.body;
    const data = {};
    if (first_name !== undefined) data.first_name = first_name;
    if (last_name !== undefined) data.last_name = last_name;
    if (profile_picture !== undefined) data.profile_picture = profile_picture;
    if (phone !== undefined) data.phone = phone;
    if (nic_id !== undefined) data.nic_id = nic_id;
    if (Object.keys(data).length === 0) return res.status(400).json({ error: 'No fields to update' });
    const user = await prisma.user.update({
      where: { id: req.userId },
      data,
      select: selectPublic,
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
}

async function list(req, res, next) {
  try {
    const users = await prisma.user.findMany({
      select: selectPublic,
      orderBy: { created_at: 'desc' },
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id, 10) },
      select: selectPublic,
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const { id } = req.params;
    const { first_name, last_name, profile_picture, role_id, is_active, password } = req.body;
    const data = {};
    if (first_name !== undefined) data.first_name = first_name;
    if (last_name !== undefined) data.last_name = last_name;
    if (profile_picture !== undefined) data.profile_picture = profile_picture;
    if (role_id !== undefined) data.role_id = role_id;
    if (is_active !== undefined) data.is_active = is_active;
    if (password !== undefined && password !== '') data.password_hash = await bcrypt.hash(password, 10);
    if (Object.keys(data).length === 0) return res.status(400).json({ error: 'No fields to update' });
    const user = await prisma.user.update({
      where: { id: parseInt(id, 10) },
      data,
      select: selectPublic,
    });
    res.json(user);
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ error: 'User not found' });
    next(err);
  }
}

module.exports = { getMe, updateMe, list, getById, update };
