import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

// ? Create
export const AddProduct = createAsyncThunk(
  "product/add_product",
  async (product, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/product-add", product, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// ? Get All
export const GetProducts = createAsyncThunk(
  "product/product-get",
  async (
    { parPage, currentPage, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/product-get?page=${currentPage}&&searchValue=${searchValue}&&parPage=${parPage}`,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ? Get One
export const GetProduct = createAsyncThunk(
  "product/get-product",
  async (productId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/product-get/${productId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ? Update Product
export const UpdateProduct = createAsyncThunk(
  "product/update-product",
  async (product, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/product-update", product, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ? Update Image
export const ProductUpdateImage = createAsyncThunk(
  "product/update-image",
  async (
    { oldImage, newImage, productId },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("oldImage", oldImage);
      formData.append("newImage", newImage);
      formData.append("productId", productId);
      const { data } = await api.post("/product-update-image", formData, {
        withCredentials: true,
      });
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
    product: "",
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
      })

      .addCase(GetProducts.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.products = [...payload.products];
        state.totalProduct = payload.totalProduct;
      })
      .addCase(GetProduct.fulfilled, (state, { payload }) => {
        state.product = payload.product;
      })

      .addCase(UpdateProduct.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(UpdateProduct.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(UpdateProduct.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.product = payload.product;
      })
      .addCase(ProductUpdateImage.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
        state.product = payload.product;
      });
  },
});

export const { clearMessage } = ProducReducer.actions;
export default ProducReducer.reducer;
