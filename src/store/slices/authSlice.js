import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  token: "",
  walletData: {},
  otpUserEmail: "",
  passwordOtpEmail: "",
  profileImg: "",
  phone: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserOtpEmail: (state, action) => {
      state.otpUserEmail = action.payload;
    },
    setWalletData: (state, action) => {
      state.walletData = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setPasswordOtpMail: (state, action) => {
      state.passwordOtpEmail = action.payload;
    },
    setProfilePic: (state, action) => {
      state.profileImg = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phone = action.payload;
    },
  },
});

export const {
  setUser,
  setUserOtpEmail,
  setToken,
  setWalletData,
  setPasswordOtpMail,
  setProfilePic,
  setPhoneNumber,
} = userSlice.actions;

export default userSlice.reducer;
