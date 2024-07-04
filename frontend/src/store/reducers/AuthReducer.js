import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { jwtDecode } from "jwt-decode";

const decodeToken = (token) => {
  if (token) {
    const userInfo = jwtDecode(token);
    return userInfo;
  } else {
    return "";
  }
};

export const CustomerRegister = createAsyncThunk(
  "product/customer_register",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/customer/customer-register", info);
      localStorage.setItem("customerToken", data.token);
      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const CustomerLogin = createAsyncThunk(
  "product/customer_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/customer/customer-login", info);
      localStorage.setItem("customerToken", data.token);
      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const AuthReducer = createSlice({
  name: "auth",
  initialState: {
    loader: false,
    userInfo: decodeToken(localStorage.getItem("customerToken")),
    errorMessage: "",
    successMessage: "",
  },
  reducers: {
    clearMessage: (state) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
    UserReset: (state) => {
      state.userInfo = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(CustomerRegister.pending, (state, { payload }) => {
      state.loader = true;
    });
    builder.addCase(CustomerRegister.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    });
    builder.addCase(CustomerRegister.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
      state.userInfo = decodeToken(payload.token);
    });
    builder.addCase(CustomerLogin.pending, (state, { payload }) => {
      state.loader = true;
    });
    builder.addCase(CustomerLogin.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    });
    builder.addCase(CustomerLogin.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
      state.userInfo = decodeToken(payload.token);
    });
  },
});

export const { clearMessage, UserReset } = AuthReducer.actions;

export default AuthReducer.reducer;
