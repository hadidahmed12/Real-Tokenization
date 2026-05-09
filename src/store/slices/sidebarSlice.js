import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: false,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    showSidebar: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
    hideSidebar: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
  },
});

export const { showSidebar, hideSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
