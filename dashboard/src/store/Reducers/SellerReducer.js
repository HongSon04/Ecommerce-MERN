import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const GetSellerRequest = createAsyncThunk(
  "product/get_seller_request",
  async (
    { parPage, searchValue, currentPage },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/request-seller-get?page=${currentPage}&&searchValue=${searchValue}&parPage=${parPage}`,
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

export const GetSellerById = createAsyncThunk(
  "product/get_seller_by_id",
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/get-seller/${sellerId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const UpdateSellerStatus = createAsyncThunk(
  "product/update_seller_status",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/seller-status-update`, info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const SellerReducer = createSlice({
  name: "seller",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    sellers: [],
    seller: "",
    totalSeller: 0,
  },
  reducers: {
    clearMessage: (state) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetSellerRequest.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(GetSellerRequest.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(GetSellerRequest.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.sellers = [...payload.sellers];
      })
      .addCase(GetSellerById.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(GetSellerById.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(GetSellerById.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.seller = payload.seller;
      })
      .addCase(UpdateSellerStatus.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(UpdateSellerStatus.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(UpdateSellerStatus.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.seller = payload.seller;
      });
  },
});

export const { clearMessage } = SellerReducer.actions;
export default SellerReducer.reducer;
