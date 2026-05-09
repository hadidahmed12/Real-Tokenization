import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeStep: 0,
};

export const stepSlice = createSlice({
  name: "step",
  initialState,
  reducers: {
    setActiveStep: (state, action) => {
      state.activeStep = action.payload;
    },
  },
});

export const { setActiveStep } = stepSlice.actions;

export default stepSlice.reducer;
