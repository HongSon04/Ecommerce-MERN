import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const GetCategories = createAsyncThunk(
  "product/getCategories",
  async (_, { fulfillWithValue }) => {
    try {
      const { data } = await api.get("/home/get-categories");
      return fulfillWithValue(data);
    } catch (err) {
      console.log(err);
      return;
    }
  }
);

export const GetProducts = createAsyncThunk(
  "product/getProducts",
  async (_, { fulfillWithValue }) => {
    try {
      const { data } = await api.get("/home/get-products");
      return fulfillWithValue(data);
    } catch (err) {
      console.log(err);
      return;
    }
  }
);

export const HomeReducer = createSlice({
  name: "home",
  initialState: {
    categories: [],
    products: [],
    lastest_products: [],
    top_rated_products: [],
    discount_products: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(GetProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.lastest_products = action.payload.lastest_products;
        state.top_rated_products = action.payload.top_rated_products;
        state.discount_products = action.payload.discount_products;
      });
  },
});

export default HomeReducer.reducer;
