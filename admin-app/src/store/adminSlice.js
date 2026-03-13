//Defines all admin-related data stored in Redux
import { createSlice } from '@reduxjs/toolkit';
//Redux Toolkit helper to create slice
import { fetchRoles, fetchUsers, fetchCompanies, fetchReviews, fetchDashboardStats, fetchReports, fetchCompanyById, updateCompany, updateReview, updateReport } from './adminApi';

//Import async API actions (Redux Thunks)
const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    roles: [],
    users: [],
    companies: [],
    reviews: [],
    reports: [],
    dashboard: null,
    currentCompany: null,
    loading: false,
    error: null,
  },
  //Reducers for synchronous state updates
  reducers: {
    //Clear error messages
    clearAdminError: (state) => {
      state.error = null;
    },
    //Clear currently viewed company details
    clearCurrentCompany: (state) => {
      state.currentCompany = null;
    },
  },

  //Handle async actions (API calls) with extraReducers
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
    //Roles
      .addCase(fetchRoles.pending, pending)
      .addCase(fetchRoles.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.roles = payload;
      })
      .addCase(fetchRoles.rejected, rejected)

      //Users
      .addCase(fetchUsers.pending, pending)
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.users = payload;
      })
      .addCase(fetchUsers.rejected, rejected)

      //Companies
      .addCase(fetchCompanies.pending, pending)
      .addCase(fetchCompanies.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.companies = payload;
      })
      .addCase(fetchCompanies.rejected, rejected)

      //Single Company Details
      .addCase(fetchCompanyById.pending, pending)
      .addCase(fetchCompanyById.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.currentCompany = payload;
      })
      .addCase(fetchCompanyById.rejected, rejected)

      //Reviews
      .addCase(fetchReviews.pending, pending)
      .addCase(fetchReviews.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.reviews = payload;
      })
      .addCase(fetchReviews.rejected, rejected)

      //Dashboard Stats
      .addCase(fetchDashboardStats.pending, pending)
      .addCase(fetchDashboardStats.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.dashboard = payload;
      })
      .addCase(fetchDashboardStats.rejected, rejected)

      //Reports Moderation
      .addCase(fetchReports.pending, pending)
      .addCase(fetchReports.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.reports = payload;
      })
      .addCase(fetchReports.rejected, rejected)

      //Update Company
      .addCase(updateCompany.fulfilled, (state, { payload }) => {
        const i = state.companies.findIndex((c) => c.id === payload.id);
        if (i !== -1) state.companies[i] = { ...state.companies[i], ...payload };
        if (state.currentCompany?.id === payload.id) state.currentCompany = { ...state.currentCompany, ...payload };
      })

      //Update Review
      .addCase(updateReview.fulfilled, (state, { payload }) => {
        const i = state.reviews.findIndex((r) => r.id === payload.id);
        if (i !== -1) state.reviews[i] = { ...state.reviews[i], ...payload };
      })

      //Update Report
      .addCase(updateReport.fulfilled, (state, { payload }) => {
        const i = state.reports.findIndex((r) => r.id === payload.id);
        if (i !== -1) state.reports[i] = { ...state.reports[i], ...payload };
      });
  },
});

//Export actions and reducer
export const { clearAdminError, clearCurrentCompany } = adminSlice.actions;
export default adminSlice.reducer;

//Selectors to access specific parts of the admin state
export const selectRoles = (state) => state.admin.roles;
export const selectUsers = (state) => state.admin.users;
export const selectCompanies = (state) => state.admin.companies;
export const selectReviews = (state) => state.admin.reviews;
export const selectDashboard = (state) => state.admin.dashboard;
export const selectReports = (state) => state.admin.reports;
export const selectCurrentCompany = (state) => state.admin.currentCompany;
export const selectAdminLoading = (state) => state.admin.loading;
export const selectAdminError = (state) => state.admin.error;
