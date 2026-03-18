import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  admin: null,
  loading: true,
  error: null,
  isAuthenticated: false,
  userExists: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.loading = false
      state.admin = action.payload;
      state.isAuthenticated = true;
    },
    loginFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.isAuthenticated = false
    },
    logout: (state) => {
      state.admin = null;
      state.isAuthenticated = false
    },
    checkAdminResult: (state, action) => {
      state.userExists = action.payload;
    },

  },

})
export const { loginStart, loginSuccess, loginFailure, logout,checkAdminResult } = authSlice.actions;
export default authSlice.reducer;
