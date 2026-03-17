import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/client';

// Authenticate admin user
export const loginAdmin = createAsyncThunk('auth/login', async (body, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/auth/login-admin', body);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

// Register a new user account
export const registerUser = createAsyncThunk('auth/register', async (body, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/auth/register', body);
    return data;
  } catch (err) {
    const msg = err.response?.data?.error || err.message || 'Registration failed';
    return rejectWithValue(typeof msg === 'string' ? msg : 'Registration failed');
  }
});

// Fetch all user roles
export const fetchRoles = createAsyncThunk('admin/roles', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/roles');
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

// Fetch all users in the system
export const fetchUsers = createAsyncThunk('admin/users', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/users');
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

// Fetch companies with optional query parameters (filters, pagination, etc.
export const fetchCompanies = createAsyncThunk('admin/companies', async (params = {}, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/companies', { params });
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

// Fetch a single company by ID
export const fetchCompanyById = createAsyncThunk('admin/companyById', async (id, { rejectWithValue }) => {
  try {
    const { data } = await api.get(`/companies/${id}`);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

// Fetch all reviews submitted in the system
export const fetchReviews = createAsyncThunk('admin/reviews', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/reviews');
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

// Fetch dashboard statistics for admin panel
export const fetchDashboardStats = createAsyncThunk('admin/dashboard', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/dashboard/stats');
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

// Fetch reports submitted by users
export const fetchReports = createAsyncThunk('admin/reports', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/reports');
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

// Update company details
export const updateCompany = createAsyncThunk('admin/updateCompany', async ({ id, ...payload }, { rejectWithValue }) => {
  try {
    const { data } = await api.patch(`/companies/${id}`, payload);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

// Update review information or status
export const updateReview = createAsyncThunk('admin/updateReview', async ({ id, ...payload }, { rejectWithValue }) => {
  try {
    const { data } = await api.patch(`/reviews/${id}`, payload);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

// Update report details or resolution status
export const updateReport = createAsyncThunk('admin/updateReport', async ({ id, ...payload }, { rejectWithValue }) => {
  try {
    const { data } = await api.patch(`/reports/${id}`, payload);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

// ----- AI Matchmaking -----
export const fetchInvestorsForStartup = createAsyncThunk(
  'admin/investorsForStartup',
  async ({ startupId, limit }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/matchmaking/investors-for-startup/${startupId}`, {
        params: limit ? { limit } : {},
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// Get recommended startups for an investor
export const fetchStartupsForInvestor = createAsyncThunk(
  'admin/startupsForInvestor',
  async ({ investorId, limit }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/matchmaking/startups-for-investor/${investorId}`, {
        params: limit ? { limit } : {},
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// Get recommended investors for an entrepreneur
export const fetchInvestorsForEntrepreneur = createAsyncThunk(
  'admin/investorsForEntrepreneur',
  async ({ entrepreneurId, limit }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/matchmaking/investors-for-entrepreneur/${entrepreneurId}`, {
        params: limit ? { limit } : {},
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// Get recommended entrepreneurs for an investor
export const fetchEntrepreneursForInvestor = createAsyncThunk(
  'admin/entrepreneursForInvestor',
  async ({ investorId, limit }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/matchmaking/entrepreneurs-for-investor/${investorId}`, {
        params: limit ? { limit } : {},
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);
