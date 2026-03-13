import { createSlice } from '@reduxjs/toolkit';
import { fetchProfile, fetchCompanies, fetchInvestors, fetchCompanySummary, fetchCompanyById, fetchReviewsByCompany, createReview, markReviewHelpful, updateProfile, fetchInvestorsForStartup, fetchStartupsForInvestor } from './userApi';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    companies: [],
    companySummary: [],
    currentCompany: null,
    companyReviews: [],
    investors: [],
    investorMatches: null,
    startupMatches: null,
    matchmakingLoading: false,
    loading: false,
    error: null,
  },
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
    clearCurrentCompany: (state) => {
      state.currentCompany = null;
      state.companyReviews = [];
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
      .addCase(fetchProfile.pending, pending)
      .addCase(fetchProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.profile = payload;
      })
      .addCase(fetchProfile.rejected, rejected)
      .addCase(fetchCompanies.pending, pending)
      .addCase(fetchCompanies.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.companies = payload;
      })
      .addCase(fetchCompanies.rejected, rejected)
      .addCase(fetchInvestors.fulfilled, (state, { payload }) => {
        state.investors = payload;
      })
      .addCase(fetchCompanySummary.pending, pending)
      .addCase(fetchCompanySummary.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.companySummary = payload;
      })
      .addCase(fetchCompanySummary.rejected, rejected)
      .addCase(fetchCompanyById.pending, pending)
      .addCase(fetchCompanyById.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.currentCompany = payload;
      })
      .addCase(fetchCompanyById.rejected, rejected)
      .addCase(fetchReviewsByCompany.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReviewsByCompany.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.companyReviews = payload;
      })
      .addCase(fetchReviewsByCompany.rejected, rejected)
      .addCase(markReviewHelpful.fulfilled, (state, { payload }) => {
        const i = state.companyReviews.findIndex((r) => r.id === payload.id);
        if (i !== -1) state.companyReviews[i].helpful_count = payload.helpful_count;
      })
      .addCase(updateProfile.fulfilled, (state, { payload }) => {
        state.profile = payload;
      })
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
      });
  },
});

export const { clearUserError, clearCurrentCompany } = userSlice.actions;
export default userSlice.reducer;

export const selectProfile = (state) => state.user.profile;
export const selectCompanies = (state) => state.user.companies;
export const selectInvestors = (state) => state.user.investors;
export const selectCompanySummary = (state) => state.user.companySummary;
export const selectCurrentCompany = (state) => state.user.currentCompany;
export const selectCompanyReviews = (state) => state.user.companyReviews;
export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;
export const selectInvestorMatches = (state) => state.user.investorMatches;
export const selectStartupMatches = (state) => state.user.startupMatches;
export const selectMatchmakingLoading = (state) => state.user.matchmakingLoading;
