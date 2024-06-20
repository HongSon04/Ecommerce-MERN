import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const AddProduct = createAsyncThunk(
  "product/product-add",
  async (product, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/product-add", product, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const GetProduct = createAsyncThunk(
  "product/get-product",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/get-product", info, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const ProducReducer = createSlice({
  name: "product",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    products: [],
    totalProduct: 0,
  },
  reducers: {
    clearMessage: (state) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddProduct.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(AddProduct.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(AddProduct.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.products = payload.product;
      })

      .addCase(GetProduct.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.products = payload.product;
        state.totalProduct = payload.totalProduct;
      });
  },
});

export const { clearMessage } = ProducReducer.actions;
export default ProducReducer.reducer;
