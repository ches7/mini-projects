import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cartStore',
  initialState: {
    cart: [],
  },
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload
    },
    clearCart: (state) => {
      state.cart = []
    },
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    setQuantity: (state, action) => {
      const item = state.cart.find((item) => item.productid === action.payload.productid);
      item.qty = action.payload.qty;
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter((item) => item.productid !== action.payload.productid);
      state.cart = removeItem;
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  setCart,
  clearCart,
  setQuantity
} = cartSlice.actions;