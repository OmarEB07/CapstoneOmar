import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest } from "../requestMethods";

export const companyLogin = createAsyncThunk(
  'company/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await publicRequest.post('/auth/company-login', { username, password });
      return response.data; // this should include the company object and token
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const companySlice = createSlice({
  name: 'company',
  initialState: {
    currentCompany: null,
    isFetching: false,
    isError: false,
    errorMessage: '',
  },
  reducers: {
    logout: (state) => {
      state.currentCompany = null;
    },
    // ... other reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(companyLogin.pending, (state) => {
        state.isFetching = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(companyLogin.fulfilled, (state, action) => {
        state.currentCompany = action.payload;
        state.isFetching = false;
      })
      .addCase(companyLogin.rejected, (state, action) => {
        state.isError = true;
        state.errorMessage = action.payload.message;
        state.isFetching = false;
      });
  },
});

export const { logout } = companySlice.actions;
export default companySlice.reducer;
