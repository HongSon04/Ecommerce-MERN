import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

// ? Get all categories
export const categoryAdd = createAsyncThunk(
  "category/categoryAdd",
  async ({ name, image }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      const { data } = await api.post("/category-add", formData, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ! End of categoryAdd

// ? Get all categories
export const getCategory = createAsyncThunk(
  "category/category-get",
  async (
    { parPage, currentPage, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/category-get?page=${currentPage}&&searchValue=${searchValue}&&parPage=${parPage}`,
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

// ! End of getCategory

export const CategoryReducer = createSlice({
  name: "category",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    categories: [],
    totalCategory: 0,
  },
  reducers: {
    clearMessage: (state) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(categoryAdd.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(categoryAdd.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(categoryAdd.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.categories = [...state.categories, payload.category];
      })
      .addCase(getCategory.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.categories = payload.categories;
        state.totalCategory = payload.totalCategories;
      });
  },
});

export const { clearMessage } = CategoryReducer.actions;
export default CategoryReducer.reducer;
