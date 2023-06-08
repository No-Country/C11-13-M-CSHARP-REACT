import { createSlice } from "@reduxjs/toolkit";
import { initMercadoPago} from "@mercadopago/sdk-react";
const initialState = {
  Id: 0,
};

const paymentSlice = createSlice({
  name: "payment",
  
  initialState,
  reducers: {
    
    setId(state, action) {
     
      state.Id = action.payload;
      if(state.Id !== 0){
        initMercadoPago(null,null);
        console.log(initMercadoPago)
        initMercadoPago("TEST-fc30be2e-cc40-46a2-9ca5-2ab08c73ada4");
        console.log("boton iniciado",initMercadoPago)
      
      }
    },
  },
});

export const { setId } = paymentSlice.actions;
export default paymentSlice.reducer;
