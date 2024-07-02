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

export const PriceRangeProduct = createAsyncThunk(
  "product/price_range_product",
  async (_, { fulfillWithValue }) => {
    try {
      const { data } = await api.get("/home/price-range-lastest-product");
      return fulfillWithValue(data);
    } catch (err) {
      console.log(err);
      return;
    }
  }
);

export const QueryProducts = createAsyncThunk(
  "product/query_products",
  async (
    { low, high, rating, category, sortPrice, pageNumber, searchValue },
    { fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/home/query-products?category=${category}&&low=${low}&&high=${high}&&rating=${rating}&&sortPrice=${sortPrice}&&pageNumber=${pageNumber}&&searchValue=${
          searchValue ? searchValue : ""
        }`
      );
      return fulfillWithValue(data);
    } catch (err) {
      console.log(err);
      return;
    }
  }
);

export const GetProductDetails = createAsyncThunk(
  "product/get_product_details",
  async (slug, { fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/get-product-details/${slug}`);
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
    totalProduct: 0,
    parPage: 3,
    lastest_products: [],
    top_rated_products: [],
    discount_products: [],
    price_range: {
      low: 0,
      high: 100,
    },
    product: {},
    relatedProducts: [],
    moreProducts: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetCategories.fulfilled, (state, { payload }) => {
        state.categories = payload;
      })
      .addCase(GetProducts.fulfilled, (state, { payload }) => {
        state.products = payload.products;
        state.lastest_products = payload.lastest_products;
        state.top_rated_products = payload.top_rated_products;
        state.discount_products = payload.discount_products;
      })
      .addCase(PriceRangeProduct.fulfilled, (state, { payload }) => {
        state.lastest_products = payload.lastest_products;
        state.price_range = payload.price_range;
      })
      .addCase(QueryProducts.fulfilled, (state, { payload }) => {
        state.products = payload.products;
        state.totalProduct = payload.totalProduct;
        state.parPage = payload.parPage;
      })
      .addCase(GetProductDetails.fulfilled, (state, { payload }) => {
        state.product = payload.product;
        state.relatedProducts = payload.relatedProducts;
        state.moreProducts = payload.moreProducts;
      });
  },
});

export default HomeReducer.reducer;
