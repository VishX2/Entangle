import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/client';

export const fetchProfile = createAsyncThunk('user/profile', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/users/me');
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const fetchCompanies = createAsyncThunk('user/companies', async (params, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/companies', { params: params || {} });
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const fetchInvestors = createAsyncThunk('user/investors', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/companies', { params: { type: 'investor' } });
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const fetchCompanySummary = createAsyncThunk('user/companySummary', async (params, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/companies/summary', { params: params || {} });
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const fetchCompanyById = createAsyncThunk('user/companyById', async (id, { rejectWithValue }) => {
  try {
    const { data } = await api.get(`/companies/${id}`);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const fetchReviewsByCompany = createAsyncThunk('user/reviewsByCompany', async (companyId, { rejectWithValue }) => {
  try {
    const { data } = await api.get(`/companies/${companyId}/reviews`);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const createReview = createAsyncThunk('user/createReview', async (body, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/reviews', body);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const markReviewHelpful = createAsyncThunk('user/markReviewHelpful', async (reviewId, { rejectWithValue }) => {
  try {
    const { data } = await api.post(`/reviews/${reviewId}/helpful`);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const updateProfile = createAsyncThunk('user/updateProfile', async (body, { rejectWithValue }) => {
  try {
    const { data } = await api.patch('/users/me', body);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

// ----- AI Matchmaking -----
export const fetchInvestorsForStartup = createAsyncThunk(
  'user/investorsForStartup',
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

export const fetchStartupsForInvestor = createAsyncThunk(
  'user/startupsForInvestor',
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
