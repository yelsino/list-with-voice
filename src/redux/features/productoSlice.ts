// textToPrices

import { Categorie, Price, ProductState } from "@/interfaces/product.interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { textToPrices } from "../chunks/productosChunck";

const initialState: ProductState = {
  prices: [],
  price: null,
};

export const productSlice = createSlice({
  name: "productos",
  initialState, 
  reducers: {
    setPrices: (state, action: PayloadAction<Price[]>) => {
      state.prices = action.payload
    },
    setPrice: (state, action: PayloadAction<Price | null>) => {
      console.log(action.payload);
      
      state.price = action.payload
    },
    deletePrice: (state, action: PayloadAction<Price>) => {
      const prices = state.prices.filter((p) => p.id !== action.payload.id)
      state.prices = prices
    },
    movePrice: (state, action: PayloadAction<Categorie>) => {
      if (!state.price) return;
      const filterPrices = state.prices.filter((p) => p.id !== state.price?.id);
      const newPrice: Price = { ...state.price, categoria: action.payload }
      state.prices = [...filterPrices, newPrice]
    },

  },
  extraReducers: (builder) => {
    builder.addCase(textToPrices.fulfilled, (state, action) => {
      state.prices = action.payload
    });
  },

});

export const {
  setPrices,
  setPrice,
  deletePrice,
  movePrice
} = productSlice.actions;

export default productSlice.reducer;
