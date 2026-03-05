import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/client';

export const loginAdmin = createAsyncThunk('auth/login', async (body, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/auth/login-admin', body);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const registerUser = createAsyncThunk('auth/register', async (body, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/auth/register', body);
    return data;
  } catch (err) {
    const msg = err.response?.data?.error || err.message || 'Registration failed';
    return rejectWithValue(typeof msg === 'string' ? msg : 'Registration failed');
  }
});

export const fetchRoles = createAsyncThunk('admin/roles', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/roles');
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const fetchUsers = createAsyncThunk('admin/users', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/users');
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const fetchCompanies = createAsyncThunk('admin/companies', async (params = {}, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/companies', { params });
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const fetchCompanyById = createAsyncThunk('admin/companyById', async (id, { rejectWithValue }) => {
  try {
    const { data } = await api.get(`/companies/${id}`);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const fetchReviews = createAsyncThunk('admin/reviews', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/reviews');
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const fetchDashboardStats = createAsyncThunk('admin/dashboard', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/dashboard/stats');
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const fetchReports = createAsyncThunk('admin/reports', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/reports');
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const updateCompany = createAsyncThunk('admin/updateCompany', async ({ id, ...payload }, { rejectWithValue }) => {
  try {
    const { data } = await api.patch(`/companies/${id}`, payload);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const updateReview = createAsyncThunk('admin/updateReview', async ({ id, ...payload }, { rejectWithValue }) => {
  try {
    const { data } = await api.patch(`/reviews/${id}`, payload);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const updateReport = createAsyncThunk('admin/updateReport', async ({ id, ...payload }, { rejectWithValue }) => {
  try {
    const { data } = await api.patch(`/reports/${id}`, payload);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});
