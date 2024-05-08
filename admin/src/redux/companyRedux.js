import { createSlice } from "@reduxjs/toolkit";
import { userRequest } from "../requestMethods";

// Initial state
const initialState = {
  companies: [],
  isFetching: false,
  error: false,
  errorMessage: "", // Add an errorMessage field to your initialState
  notification: null, // Correct placement inside initialState
};

// Slice
const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    // Notification actions
    setNotificationcompany: (state, action) => {
      state.notification = action.payload;
    },
    clearNotificationcompany: (state) => {
      state.notification = null;
    },

    // Start actions
    getCompaniesStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addCompanyStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateCompanyStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteCompanyStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },

    // Success actions
    getCompaniesSuccess: (state, action) => {
      state.isFetching = false;
      state.companies = action.payload;
    },
    addCompanySuccess: (state, action) => {
      state.isFetching = false;
      state.companies.push(action.payload);
      state.notification = { type: 'success', message: 'Company added successfully!' };
    },
    updateCompanySuccess: (state, action) => {
      state.isFetching = false;
      state.companies = state.companies.map(company =>
        company._id === action.payload._id ? action.payload : company
      );
      state.notification = { type: 'success', message: 'Company updated successfully!' };
    },
    deleteCompanySuccess: (state, action) => {
      state.isFetching = false;
      state.companies = state.companies.filter(company => company._id !== action.payload);
      state.notification = { type: 'success', message: 'Company deleted successfully!' };
    },

    // Failure actions
    getCompaniesFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errorMessage = action.payload || "Failed to fetch companies";
      state.notification = { type: 'error', message: action.payload || "Failed to fetch companies" };
    },
    addCompanyFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errorMessage = action.payload || "Failed to add company";
      state.notification = { type: 'error', message: action.payload || "Failed to add company" };
    },
    updateCompanyFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errorMessage = action.payload || "Failed to update company";
      state.notification = { type: 'error', message: action.payload || "Failed to update company" };
    },
    deleteCompanyFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errorMessage = action.payload || "Failed to delete company";
      state.notification = { type: 'error', message: action.payload || "Failed to delete company" };
    },
  },
});

export const {
  getCompaniesStart,
  getCompaniesSuccess,
  getCompaniesFailure,
  addCompanyStart,
  addCompanySuccess,
  addCompanyFailure,
  updateCompanyStart,
  updateCompanySuccess,
  updateCompanyFailure,
  deleteCompanyStart,
  deleteCompanySuccess,
  deleteCompanyFailure,
  setNotificationcompany,
  clearNotificationcompany,
} = companySlice.actions;

export default companySlice.reducer;
