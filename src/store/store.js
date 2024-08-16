import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice/userSlice";
import cartReducer from "./cartSlice/cartSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
