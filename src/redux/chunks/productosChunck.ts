import { ResponseParams } from "@/interfaces/global.interface";
import { Price } from "@/interfaces/product.interface";
import { PRICE_LIST } from "@/types/uri.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const textToPrices2 = async (texto: string) => {
  const response = await axios.post<Price[]>(
    PRICE_LIST, {texto:texto}
  );
  // Price
  return response.data;
};

export const textToPrices = createAsyncThunk(
  "text_to_prices",
  async (texto: string) => {
    const response = await axios.post<Price[]>(PRICE_LIST, {
      texto: texto,
    });
    // Price
    return response.data;
  }
);


