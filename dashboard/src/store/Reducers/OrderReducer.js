import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const GetAdminOrders = createAsyncThunk(
  "product/get_admin_orders",
  async (
    { parPage, searchValue, currentPage },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/order/get-admin-orders?page=${currentPage}&&searchValue=${searchValue}&parPage=${parPage}`,
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

export const GetAdminOrder = createAsyncThunk(
  "order/get_admin_order",
  async (orderId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/order/get-admin-order/${orderId}`);
      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const AdminOrderStatusUpdate = createAsyncThunk(
  "order/admin_order_status_update",
  async ({ orderId, info }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(
        `/order/admin/order-status/${orderId}`,
        info
      );
      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const GetSellerOrders = createAsyncThunk(
  "product/get_seller_orders",
  async (
    { parPage, searchValue, currentPage, sellerId },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/order/seller/get-seller-orders/${sellerId}?page=${currentPage}&searchValue=${searchValue}&parPage=${parPage}`,
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const GetSellerOrder = createAsyncThunk(
  "order/get_seller_order",
  async (orderId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/order/seller/get-seller-order/${orderId}`
      );
      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const SellerOrderStatusUpdate = createAsyncThunk(
  "order/seller_order_status_update",
  async ({ orderId, info }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(
        `/order/seller/order-status/${orderId}`,
        info
      );
      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const OrderReducer = createSlice({
  name: "order",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    orders: [],
    myOrder: {},
    totalOrder: 0,
  },
  reducers: {
    clearMessage: (state) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetAdminOrders.fulfilled, (state, { payload }) => {
        state.orders = payload.orders;
        state.totalOrder = payload.totalOrder;
      })
      .addCase(GetAdminOrder.fulfilled, (state, { payload }) => {
        state.myOrder = payload.order;
      })
      .addCase(AdminOrderStatusUpdate.rejected, (state, { payload }) => {
        state.errorMessage = payload.message;
      })
      .addCase(AdminOrderStatusUpdate.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
      })
      .addCase(SellerOrderStatusUpdate.rejected, (state, { payload }) => {
        state.errorMessage = payload.message;
      })
      .addCase(SellerOrderStatusUpdate.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
      })
      .addCase(GetSellerOrders.fulfilled, (state, { payload }) => {
        state.orders = payload.orders;
        state.totalOrder = payload.totalOrder;
      })
      .addCase(GetSellerOrder.fulfilled, (state, { payload }) => {
        state.myOrder = payload.order;
      });
  },
});

export const { clearMessage } = OrderReducer.actions;
export default OrderReducer.reducer;
