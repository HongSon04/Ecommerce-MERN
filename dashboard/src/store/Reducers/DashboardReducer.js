import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import { GetSellerDashboardData } from "./SellerReducer";

export const GetAdminDashboardData = createAsyncThunk(
  "auth/get_admin_dashboard_data",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/admin/get-dashboard-data", {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const DashboardReducer = createSlice({
  name: "dashboard",
  initialState: {
    totalSale: 0,
    totalOrder: 0,
    totalProduct: 0,
    totalPendingOrder: 0,
    totalSeller: 0,
    recentOrders: [],
    recentMessage: [],
  },
  reducers: {
    clearMessage: (state) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetAdminDashboardData.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(GetAdminDashboardData.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(GetAdminDashboardData.fulfilled, (state, { payload }) => {
        state.totalSale = payload.totalSale;
        state.totalOrder = payload.totalOrder;
        state.totalProduct = payload.totalProduct;
        state.totalSeller = payload.totalSeller;
        state.recentOrders = payload.recentOrders;
        state.recentMessage = payload.recentMessage;
        state.loader = false;
      })
      .addCase(GetSellerDashboardData.fulfilled, (state, { payload }) => {
        state.totalSale = payload.totalSale;
        state.totalOrder = payload.totalOrder;
        state.totalProduct = payload.totalProduct;
        state.recentOrders = payload.recentOrders;
        state.recentMessage = payload.recentMessage;
        state.totalPendingOrder = payload.totalPendingOrder;
        state.loader = false;
      });
  },
});

export const { clearMessage } = DashboardReducer.actions;
export default DashboardReducer.reducer;
