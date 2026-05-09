import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeStatus: "available",
};

export const propertySlice = createSlice({
  name: "propertySlice",
  initialState,
  reducers: {
    setActiveStatus: (state, action) => {
      state.activeStatus = action.payload;
    },
  },
});

export const { setActiveStatus } = propertySlice.actions;

export default propertySlice.reducer;
