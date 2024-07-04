import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const AddFriend = createAsyncThunk(
  "chat/add_friend",
  async (info, { fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        "/chat/customer/add-customer-friend",
        info
      );
      return fulfillWithValue(data);
    } catch (err) {
      console.log(err);
      return;
    }
  }
);

export const SendMessage = createAsyncThunk(
  "chat/send_message",
  async (info, { fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        "/chat/customer/send-message-to-seller",
        info
      );
      return fulfillWithValue(data);
    } catch (err) {
      console.log(err);
      return;
    }
  }
);

export const ChatReducer = createSlice({
  name: "chat",
  initialState: {
    my_friends: [],
    fd_messages: [],
    currentFd: "",
    errorMessage: "",
    successMessage: "",
  },
  reducers: {
    clearMessage: (state) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddFriend.fulfilled, (state, { payload }) => {
        state.fd_messages = payload.messages;
        state.currentFd = payload.currentFd;
        state.my_friends = payload.MyFriends;
      })
      .addCase(SendMessage.fulfilled, (state, { payload }) => {
        let tempFriends = state.my_friends;
        let index = tempFriends.findIndex(
          (f) => f.fdId === payload.message.receverId
        );

        while (index > 0) {
          let temp = tempFriends[index];
          tempFriends[index] = tempFriends[index - 1];
          tempFriends[index - 1] = temp;
          index--;
        }
        state.fd_messages = [...state.fd_messages, payload.message];
        state.currentFd = payload.currentFd;
        state.my_friends = tempFriends;
        state.successMessage = "Message Sent Successfully";
      });
  },
});

export const { clearMessage } = ChatReducer.actions;

export default ChatReducer.reducer;
