import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cart: [],
  activeStep: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItem: (state, action) => {
      if (state.cart.length > 0) {
        toast.error("Cart can only hold one item.");
        return;
      }
      const itemExists = state.cart.find(
        (item) => item?._id === action.payload?._id
      );
      if (!itemExists) {
        state.cart.push(action.payload);
        toast.success("Item added to the cart");
      }
    },
    removeCartItem: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item?._id !== action.payload?._id
      );
    },
    emptyCart: (state) => {
      state.cart = [];
    },
  },
});

export const { setCartItem, removeCartItem, emptyCart, resetCart } =
  cartSlice.actions;

export default cartSlice.reducer;
