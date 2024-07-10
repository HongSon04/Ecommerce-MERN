import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const GetSellerPaymentDetails = createAsyncThunk(
  "payment/get_seller_payment_details",
  async ({ sellerId }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/payment/seller-payment-details/${sellerId}`,
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

export const SendWithDrawRequest = createAsyncThunk(
  "payment/send_withdraw_request",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/payment/withdraw-request`, info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const GetPaymentRequest = createAsyncThunk(
  "payment/get_payment_request",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/payment/request`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const ConfirmPaymentRequest = createAsyncThunk(
  "payment/confirm_payment_request",
  async (paymentId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(`/payment/request-confirm/${paymentId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ! End of categoryAdd

export const PaymentReducer = createSlice({
  name: "payment",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    pendingWithdraws: [],
    successWithdraws: [],
    totalAmount: 0,
    withdrawAmount: 0,
    pendingAmount: 0,
    availableAmount: 0,
  },
  reducers: {
    clearMessage: (state) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetSellerPaymentDetails.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(GetSellerPaymentDetails.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(GetSellerPaymentDetails.fulfilled, (state, { payload }) => {
        state.pendingWithdraws = payload.pendingWithdraws;
        state.successWithdraws = payload.successWithdraws;
        state.totalAmount = payload.totalAmount;
        state.withdrawAmount = payload.withdrawAmount;
        state.pendingAmount = payload.pendingAmount;
        state.availableAmount = payload.availableAmount;
        state.loader = false;
      })
      .addCase(SendWithDrawRequest.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(SendWithDrawRequest.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(SendWithDrawRequest.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.pendingWithdraws = [...state.pendingWithdraws, payload.withdraw];
        state.availableAmount = state.availableAmount - payload.withdraw.amount;
        // state.pendingAmount = payload.withdraw.amount;
        state.pendingAmount = state.pendingAmount + payload.withdraw.amount;
      })
      .addCase(GetPaymentRequest.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.pendingWithdraws = payload.withdrawRequest;
      })
      .addCase(ConfirmPaymentRequest.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(ConfirmPaymentRequest.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(ConfirmPaymentRequest.fulfilled, (state, { payload }) => {
        const temp = state.pendingWithdraws.filter(
          (item) => item._id !== payload.payment._id
        );
        state.loader = false;
        state.successMessage = payload.message;
        state.pendingWithdraws = temp;
      });
  },
});

export const { clearMessage } = PaymentReducer.actions;
export default PaymentReducer.reducer;
