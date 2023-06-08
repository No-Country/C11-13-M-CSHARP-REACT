import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const shopingCart = createSlice({
  name: "DATS",
  initialState,
  reducers: {
    loadCart(state, action) {
     
      state.data = action.payload;
    },
    clearCarts(state, action){
      state.data = action.payload
    }
  },
  
});

export const { loadCart, clearCarts } = shopingCart.actions;
export default shopingCart.reducer;
