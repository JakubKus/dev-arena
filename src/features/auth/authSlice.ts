import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store';

interface AuthState {
  success: boolean;
  pending: boolean;
  failure: boolean;
  guest: boolean;
}

const initialState: AuthState = {
  success: false,
  pending: false,
  failure: false,
  guest: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    beginLogin: state => {
      state.pending = true;
      state.success = state.failure = false;
    },
    failLogin: (state) => {
      state.failure = true;
      state.success = state.pending = false;
    },
    fulfillLogin: state => {
      state.success = true;
      state.pending = state.failure = state.guest = false;
    },
    logOut: state => {
      state.success = state.pending = state.failure = false;
    },
    beginGuest: state => {
      state.guest = true;
    },
  },
});

export const { beginLogin, failLogin, fulfillLogin, logOut, beginGuest } = authSlice.actions;

export const selectAuth = ({ auth }: RootState) => auth.success;
export const selectPendingLogin = ({ auth }: RootState) => auth.pending;
export const selectLoginFailed = ({ auth }: RootState) => auth.failure;
export const selectGuest = ({ auth }: RootState) => auth.guest;

export default authSlice.reducer;
