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
    builder.addCase(GetAdminOrders.fulfilled, (state, { payload }) => {
      state.orders = payload.orders;
      state.totalOrder = payload.totalOrder;
    });
  },
});

export const { clearMessage } = OrderReducer.actions;
export default OrderReducer.reducer;
