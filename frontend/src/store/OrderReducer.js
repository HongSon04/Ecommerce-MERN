import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

export const PlaceOrder = createAsyncThunk(
  "order/place_order",
  async (
    { products, price, shipping_fee, items, shippingInfo, userId, navigate },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.post("/order/place-order", {
        products,
        price,
        shipping_fee,
        items,
        shippingInfo,
        userId,
        navigate,
      });
      navigate("/payment", {
        state: {
          price: price + shipping_fee,
          items,
          orderID: data.orderID,
        },
      });
      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const GetOrders = createAsyncThunk(
  "order/get_orders",
  async ({ customerId, status }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/order/get-orders/${customerId}/${status}`
      );
      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const GetOrderDetails = createAsyncThunk(
  "order/get_order_details",
  async (orderId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/order/get-order-details/${orderId}`);
      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


export const OrderReducer = createSlice({
  name: "order",
  initialState: {
    myOrders: [],
    errorMessage: "",
    successMessage: "",
    myOrder: {},
  },
  reducers: {
    clearMessage: (state) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(PlaceOrder.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(PlaceOrder.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(PlaceOrder.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
      })
      .addCase(GetOrders.fulfilled, (state, { payload }) => {
        state.myOrders = payload.orders;
      })
      .addCase(GetOrderDetails.fulfilled, (state, { payload }) => {
        state.myOrder = payload.order;
      });
  },
});

export const { clearMessage } = OrderReducer.actions;

export default OrderReducer.reducer;
