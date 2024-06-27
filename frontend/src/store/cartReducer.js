import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

export const AddToCart = createAsyncThunk(
  "product/add_to_cart",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/home/product/add-to-cart", info);
      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const GetCartProducts = createAsyncThunk(
  "product/get_cart_products",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/product/get-cart-products/${userId}`
      );
      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const CartReducer = createSlice({
  name: "cart",
  initialState: {
    cart_products: [],
    cart_product_count: 0,
    wishlist_products: [],
    wishlist_product_count: 0,
    price: 0,
    loader: false,
    errorMessage: "",
    successMessage: "",
    shipping_fee: 0,
    out_of_stock_products: [],
  },
  reducers: {
    clearMessage: (state) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(AddToCart.pending, (state, { payload }) => {
      state.loader = true;
    });
    builder.addCase(AddToCart.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    });
    builder.addCase(AddToCart.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
    });
  },
});

export const { clearMessage } = CartReducer.actions;

export default CartReducer.reducer;
