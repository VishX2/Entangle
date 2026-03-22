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

export const fetchMyCompany = createAsyncThunk(
  'user/fetchMyCompany',
  async (companyType, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/companies/me', { params: companyType ? { company_type: companyType } : {} });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const updateMyCompany = createAsyncThunk(
  'user/updateMyCompany',
  async ({ companyType, body }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch('/companies/me', body, {
        params: companyType ? { company_type: companyType } : {},
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const fetchConnectionRequestsIncoming = createAsyncThunk(
  'user/fetchConnectionRequestsIncoming',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/connection-requests/incoming');
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const respondConnectionRequest = createAsyncThunk(
  'user/respondConnectionRequest',
  async ({ id, action }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/connection-requests/${id}/respond`, { action });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const getImageKitAuth = createAsyncThunk('user/imageKitAuth', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/imagekit/auth');
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

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

export const fetchInvestorsForEntrepreneur = createAsyncThunk(
  'user/investorsForEntrepreneur',
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

export const fetchEntrepreneursForInvestor = createAsyncThunk(
  'user/entrepreneursForInvestor',
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

export const uploadDocument = createAsyncThunk(
  'user/uploadDocument',
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const { data } = await api.post('/documents/upload-public', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const fetchConversations = createAsyncThunk('user/conversations', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/conversations');
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const getOrCreateConversation = createAsyncThunk('user/getOrCreateConversation', async (otherUserId, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/conversations', { other_user_id: otherUserId });
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const fetchMessages = createAsyncThunk('user/messages', async (conversationId, { rejectWithValue }) => {
  try {
    const { data } = await api.get(`/conversations/${conversationId}/messages`);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const sendMessage = createAsyncThunk('user/sendMessage', async ({ conversationId, content }, { rejectWithValue }) => {
  try {
    const { data } = await api.post(`/conversations/${conversationId}/messages`, { content });
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const fetchNotifications = createAsyncThunk('user/notifications', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/notifications');
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const markNotificationRead = createAsyncThunk('user/markNotificationRead', async (id, { rejectWithValue }) => {
  try {
    await api.patch(`/notifications/${id}/read`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const markAllNotificationsRead = createAsyncThunk('user/markAllNotificationsRead', async (_, { rejectWithValue }) => {
  try {
    await api.patch('/notifications/read-all');
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const fetchProfileGuidance = createAsyncThunk('user/profileGuidance', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/profile/guidance');
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const sendConnectionRequest = createAsyncThunk(
  'user/sendConnectionRequest',
  async ({ to_company_id, message }, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/connection-requests', { to_company_id, message });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const fetchConnectionRequestsSent = createAsyncThunk(
  'user/connectionRequestsSent',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/connection-requests/sent');
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const scanContent = createAsyncThunk('user/scanContent', async ({ text, fields }, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/content/scan', { text, fields });
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const fetchSearchByPrompt = createAsyncThunk(
  'user/searchByPrompt',
  async ({ prompt, type, limit }, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/matchmaking/search', { prompt, type }, {
        params: limit ? { limit } : {},
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);
