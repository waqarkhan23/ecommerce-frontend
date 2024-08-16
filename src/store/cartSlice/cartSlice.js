import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
  items: [],
  totalPrice: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existingItem = state.items.find((x) => x._id === item._id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      state.count++;
      state.totalPrice += item.price;
    },
    removeFromCart(state, action) {
      const itemToRemove = action.payload;
      state.items = state.items.filter((x) => x._id !== itemToRemove._id);
      state.count--;
      state.totalPrice -= itemToRemove.price * itemToRemove.quantity;
    },
    clearCart(state) {
      state.items = [];
      state.count = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
