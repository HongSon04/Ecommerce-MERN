import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

export const GetCustomers = createAsyncThunk(
  "chat/get_customers",
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/chat/seller/get-customers/${sellerId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const GetCustomerMessage = createAsyncThunk(
  "chat/get_customer_message",
  async (customerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/chat/seller/get-customer-message/${customerId}`,
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

export const SendMessage = createAsyncThunk(
  "chat/send_message",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        `/chat/seller/send-message-to-customer`,
        info,
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

export const GetSellers = createAsyncThunk(
  "chat/get_sellers",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/chat/admin/get-sellers`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const SendMessageSellerAdmin = createAsyncThunk(
  "chat/send_message_seller_admin",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/chat/message-send-to-admin`, info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const GetAdminMessage = createAsyncThunk(
  "chat/get_admin_message",
  async (receverId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/chat/get-admin-message/${receverId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const GetSellerMessage = createAsyncThunk(
  "chat/get_seller_message",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/chat/get-seller-message`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const ChatReducer = createSlice({
  name: "chat",
  initialState: {
    successMessage: "",
    errorMessage: "",
    customers: [],
    messages: [],
    activeCustomer: [],
    activeSeller: [],
    activeAdmin: "",
    friends: [],
    seller_admin_messages: [],
    currentSeller: {},
    currentCustomer: {},
    sellers: [],
  },
  reducers: {
    clearMessage: (state) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
    updateMessage: (state, { payload }) => {
      state.messages = [...state.messages, payload];
    },
    updateSellers: (state, { payload }) => {
      state.activeSeller = payload;
    },
    updateCustomers: (state, { payload }) => {
      state.activeCustomer = payload;
    },
    updateAdminMessage: (state, { payload }) => {
      state.seller_admin_messages = [...state.seller_admin_messages, payload];
    },
    updateSellerMessage: (state, { payload }) => {
      state.seller_admin_messages = [...state.seller_admin_messages, payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetCustomers.fulfilled, (state, { payload }) => {
        state.customers = payload.customers;
      })
      .addCase(GetCustomerMessage.fulfilled, (state, { payload }) => {
        state.messages = payload.messages;
        state.currentCustomer = payload.currentCustomer;
      })
      .addCase(SendMessage.fulfilled, (state, { payload }) => {
        let tempFriends = state.customers;
        let index = tempFriends.findIndex(
          (f) => f.fdId === payload.message.receverId
        );

        while (index > 0) {
          let temp = tempFriends[index];
          tempFriends[index] = tempFriends[index - 1];
          tempFriends[index - 1] = temp;
          index--;
        }
        state.messages = [...state.messages, payload.message];
        state.customers = tempFriends;
        state.successMessage = "Message Sent Successfully";
      })
      .addCase(GetSellers.fulfilled, (state, { payload }) => {
        state.sellers = payload.sellers;
      })
      .addCase(SendMessageSellerAdmin.fulfilled, (state, { payload }) => {
        state.seller_admin_messages = [
          ...state.seller_admin_messages,
          payload.message,
        ];
        state.successMessage = "Message Sent Successfully";
      })
      .addCase(GetAdminMessage.fulfilled, (state, { payload }) => {
        state.seller_admin_messages = payload.messages;
        state.currentSeller = payload.currentSeller;
      })
      .addCase(GetSellerMessage.fulfilled, (state, { payload }) => {
        state.seller_admin_messages = payload.messages;
      });
  },
});

export const {
  clearMessage,
  updateMessage,
  updateSellers,
  updateCustomers,
  updateAdminMessage,
  updateSellerMessage,
} = ChatReducer.actions;
export default ChatReducer.reducer;
