import { createSlice } from "@reduxjs/toolkit";

// ! initial state
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
  },
  reducers: {
    loginAction: (state, action) => {
      state.user = action.payload;
    },

    // ! LooutAction
    logoutAction: (state, action) => {
      state.user = null;
    },
  },
});

//! Generate actions

export const { loginAction, logoutAction } = authSlice.actions;
//! Generate reducer
const authReducer = authSlice.reducer;
export default authReducer;
