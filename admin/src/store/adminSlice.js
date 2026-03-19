import { createSlice } from '@reduxjs/toolkit';
import { fetchRoles, fetchUsers, fetchCompanies, fetchReviews, fetchDashboardStats, fetchReports, fetchCompanyById, updateCompany, updateReview, updateReport, updateUser, fetchConnectionRequests, updateConnectionRequest, fetchInvestorsForStartup, fetchStartupsForInvestor, fetchInvestorsForEntrepreneur, fetchEntrepreneursForInvestor } from './adminApi';

// Create the admin slice which manages all admin-related state
const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    roles: [],
    users: [],
    companies: [],
    reviews: [],
    reports: [],
    connectionRequests: [],
    dashboard: null,
    currentCompany: null,
    investorMatches: null,
    startupMatches: null,
    entrepreneurMatches: null,
    investorEntrepreneurMatches: null,
    matchmakingLoading: false,
    loading: false,
    error: null,
  },

  //Reducers for synchronous state updates
  reducers: {
    clearAdminError: (state) => {
      state.error = null;
    },

    // Clear currently viewed company details
    clearCurrentCompany: (state) => {
      state.currentCompany = null;
    },
  },
  extraReducers: (builder) => {
    const pending = (state) => {
      state.loading = true;
      state.error = null;
    };
    const rejected = (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Request failed';
    };

    builder
    // ===Roles===
      .addCase(fetchRoles.pending, pending)
      .addCase(fetchRoles.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.roles = payload;
      })
      .addCase(fetchRoles.rejected, rejected)

      // ===Users===
      .addCase(fetchUsers.pending, pending)
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.users = payload;
      })
      .addCase(fetchUsers.rejected, rejected)

      // ===Companies===
      .addCase(fetchCompanies.pending, pending)
      .addCase(fetchCompanies.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.companies = payload;
      })
      .addCase(fetchCompanies.rejected, rejected)

      .addCase(fetchCompanyById.pending, pending)
      .addCase(fetchCompanyById.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.currentCompany = payload;
      })
      .addCase(fetchCompanyById.rejected, rejected)

      // ===Reviews===
      .addCase(fetchReviews.pending, pending)
      .addCase(fetchReviews.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.reviews = payload;
      })
      .addCase(fetchReviews.rejected, rejected)

      // ===Dashboard===
      .addCase(fetchDashboardStats.pending, pending)
      .addCase(fetchDashboardStats.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.dashboard = payload;
      })
      .addCase(fetchDashboardStats.rejected, rejected)

      // ===Reports===
      .addCase(fetchReports.pending, pending)
      .addCase(fetchReports.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.reports = payload;
      })
      .addCase(fetchReports.rejected, rejected)

      // ===Update Entities===
      // Update company details
      .addCase(updateCompany.fulfilled, (state, { payload }) => {
        const i = state.companies.findIndex((c) => c.id === payload.id);
        if (i !== -1) state.companies[i] = { ...state.companies[i], ...payload };
        if (state.currentCompany?.id === payload.id) state.currentCompany = { ...state.currentCompany, ...payload };
      })
      // Update review status
      .addCase(updateReview.fulfilled, (state, { payload }) => {
        const i = state.reviews.findIndex((r) => r.id === payload.id);
        if (i !== -1) state.reviews[i] = { ...state.reviews[i], ...payload };
      })
      // Update report status
      .addCase(updateReport.fulfilled, (state, { payload }) => {
        const i = state.reports.findIndex((r) => r.id === payload.id);
        if (i !== -1) state.reports[i] = { ...state.reports[i], ...payload };
      })
      // Update user details
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        const i = state.users.findIndex((u) => u.id === payload.id);
        if (i !== -1) state.users[i] = { ...state.users[i], ...payload };
      })

      // ===Connection Requests===
      .addCase(fetchConnectionRequests.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.connectionRequests = payload;
      })
      .addCase(fetchConnectionRequests.pending, pending)

      // Update connection request status
      .addCase(fetchConnectionRequests.rejected, rejected)
      .addCase(updateConnectionRequest.fulfilled, (state, { payload }) => {
        const i = state.connectionRequests.findIndex((r) => r.id === payload.id);
        if (i !== -1) state.connectionRequests[i] = { ...state.connectionRequests[i], status: payload.status };
      })

      // ===Matchmaking Features===
      // Investors matched for a startup
      .addCase(fetchInvestorsForStartup.pending, (state) => {
        state.matchmakingLoading = true;
        state.investorMatches = null;
      })
      .addCase(fetchInvestorsForStartup.fulfilled, (state, { payload }) => {
        state.matchmakingLoading = false;
        state.investorMatches = payload;
      })
      .addCase(fetchInvestorsForStartup.rejected, (state) => {
        state.matchmakingLoading = false;
      })

      // Startups matched for an investor
      .addCase(fetchStartupsForInvestor.pending, (state) => {
        state.matchmakingLoading = true;
        state.startupMatches = null;
      })
      .addCase(fetchStartupsForInvestor.fulfilled, (state, { payload }) => {
        state.matchmakingLoading = false;
        state.startupMatches = payload;
      })
      .addCase(fetchStartupsForInvestor.rejected, (state) => {
        state.matchmakingLoading = false;
      })

      // Investors matched for an entrepreneur
      .addCase(fetchInvestorsForEntrepreneur.pending, (state) => {
        state.matchmakingLoading = true;
        state.entrepreneurMatches = null;
      })
      .addCase(fetchInvestorsForEntrepreneur.fulfilled, (state, { payload }) => {
        state.matchmakingLoading = false;
        state.entrepreneurMatches = payload;
      })
      .addCase(fetchInvestorsForEntrepreneur.rejected, (state) => {
        state.matchmakingLoading = false;
      })

      // Entrepreneurs matched for an investor
      .addCase(fetchEntrepreneursForInvestor.pending, (state) => {
        state.matchmakingLoading = true;
        state.investorEntrepreneurMatches = null;
      })
      .addCase(fetchEntrepreneursForInvestor.fulfilled, (state, { payload }) => {
        state.matchmakingLoading = false;
        state.investorEntrepreneurMatches = payload;
      })
      .addCase(fetchEntrepreneursForInvestor.rejected, (state) => {
        state.matchmakingLoading = false;
      });
  },
});

export const { clearAdminError, clearCurrentCompany } = adminSlice.actions;
export default adminSlice.reducer;

// Helper functions to access admin state from Redux store
export const selectRoles = (state) => state.admin.roles;
export const selectUsers = (state) => state.admin.users;
export const selectCompanies = (state) => state.admin.companies;
export const selectReviews = (state) => state.admin.reviews;
export const selectDashboard = (state) => state.admin.dashboard;
export const selectReports = (state) => state.admin.reports;
export const selectConnectionRequests = (state) => state.admin.connectionRequests;
export const selectCurrentCompany = (state) => state.admin.currentCompany;
export const selectAdminLoading = (state) => state.admin.loading;
export const selectAdminError = (state) => state.admin.error;
export const selectInvestorMatches = (state) => state.admin.investorMatches;
export const selectStartupMatches = (state) => state.admin.startupMatches;
export const selectEntrepreneurMatches = (state) => state.admin.entrepreneurMatches;
export const selectInvestorEntrepreneurMatches = (state) => state.admin.investorEntrepreneurMatches;
export const selectMatchmakingLoading = (state) => state.admin.matchmakingLoading;
