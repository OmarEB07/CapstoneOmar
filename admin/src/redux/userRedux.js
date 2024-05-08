import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    users: [],
    isFetching: false,
    error: false,
    errorMessage: "", // Store error messages
    notification: null, // Manage notifications similarly
  },
  reducers: {
    // Notifications
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
    clearNotification: (state) => {
      state.notification = null;
    },
    // Login actions
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errorMessage = action.payload || "Login failed";
      state.notification = { type: 'error', message: state.errorMessage };
    },
    logout: (state) => {
      state.currentUser = null;
    },
    // Get all users
    getUsersStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getUsersSuccess: (state, action) => {
      state.isFetching = false;
      state.users = action.payload;
    },
    getUsersFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errorMessage = action.payload || "Failed to fetch users";
      state.notification = { type: 'error', message: state.errorMessage };
    },
    // Delete user
    deleteUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users = state.users.filter(user => user._id !== action.payload);
      state.notification = { type: 'success', message: 'User deleted successfully!' };
    },
    deleteUserFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errorMessage = action.payload || "Failed to delete user";
      state.notification = { type: 'error', message: state.errorMessage };
    },
    // Update user
    updateUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users = state.users.map(user => user._id === action.payload._id ? action.payload : user);
      state.notification = { type: 'success', message: 'User updated successfully!' };
    },
    updateUserFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errorMessage = action.payload || "Failed to update user";
      state.notification = { type: 'error', message: state.errorMessage };
    },
    // Add user
    addUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users.push(action.payload);
      state.notification = { type: 'success', message: 'User added successfully!' };
    },
    addUserFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errorMessage = action.payload || "Failed to add user";
      state.notification = { type: 'error', message: state.errorMessage };
    },
  },
});

export const {
  setNotification,
  clearNotification,
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
