import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

export const GetDashboardIndexData = createAsyncThunk(
  "order/get_dashboard_index_data",
  async (userID, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/order/get-dashboard-data/${userID}`);
      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const DashboardReducer = createSlice({
  name: "dashboard",
  initialState: {
    recentOrders: [],
    errorMessage: "",
    successMessage: "",
    totalOrder: 0,
    pendingOrder: 0,
    cancelledOrder: 0,
  },
  reducers: {
    clearMessage: (state) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetDashboardIndexData.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(GetDashboardIndexData.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(GetDashboardIndexData.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.totalOrder = payload.totalOrder;
        state.pendingOrder = payload.pendingOrder;
        state.cancelledOrder = payload.cancelledOrder;
        state.recentOrders = payload.recentOrders;
      });
  },
});

export const { clearMessage } = DashboardReducer.actions;

export default DashboardReducer.reducer;
