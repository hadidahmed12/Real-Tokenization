import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  directDeposit: false,
  directWithdraw: false,
};

export const directModalSlice = createSlice({
  name: "directModal",
  initialState,
  reducers: {
    setDirectDeposit: (state, action) => {
      state.directDeposit = action.payload;
    },
    setDirectWithdraw: (state, action) => {
      state.directWithdraw = action.payload;
    },
  },
});

export const { setDirectDeposit, setDirectWithdraw } = directModalSlice.actions;

export default directModalSlice.reducer;
