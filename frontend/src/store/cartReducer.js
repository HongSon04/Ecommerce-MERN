import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

export const AddToCart = createAsyncThunk(
  "product/add_to_cart",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/home/product/add-to-cart", info);
      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const GetCartProducts = createAsyncThunk(
  "product/get_cart_products",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/product/get-cart-products/${userId}`
      );
      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const DeleteCartProduct = createAsyncThunk(
  "product/delete_cart_product",
  async (cart_id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(
        `/home/product/delete-cart-products/${cart_id}`
      );
      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const QuantityInc = createAsyncThunk(
  "product/quantity_inc",
  async (cart_id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(`/home/product/quantity-inc/${cart_id}`);
      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const QuantityDec = createAsyncThunk(
  "product/quantity_dec",
  async (cart_id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(`/home/product/quantity-dec/${cart_id}`);
      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const AddToWishlist = createAsyncThunk(
  "wishlist/add_to_wishlist",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/home/product/add-to-wishlist", info);
      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const GetWishlistProducts = createAsyncThunk(
  "wishlist/get_wishlist_products",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/product/get-wishlist-products/${userId}`
      );
      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const RemoveWishlist = createAsyncThunk(
  "wishlist/remove_wishlist",
  async (wishlistId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(
        `/home/product/remove-wishlist-products/${wishlistId}`
      );
      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const CartReducer = createSlice({
  name: "cart",
  initialState: {
    cart_products: [],
    cart_product_count: 0,
    wishlist_products: [],
    wishlist_count: 0,
    price: 0,
    loader: false,
    errorMessage: "",
    successMessage: "",
    shipping_fee: 0,
    out_of_stock_products: [],
  },
  reducers: {
    clearMessage: (state) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
    ResetCountCart: (state) => {
      state.cart_product_count = 0;
      state.wishlist_count = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddToCart.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(AddToCart.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(AddToCart.fulfilled, (state, { payload }) => {
        state.loader = false;

        state.cart_product_count += 1;
        state.successMessage = payload.message;
      })
      .addCase(DeleteCartProduct.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
      })
      .addCase(QuantityInc.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
      })
      .addCase(QuantityDec.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
      })
      .addCase(GetCartProducts.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.cart_products = payload.cart_products;
        state.price = payload.price;
        state.cart_product_count = payload.cart_product_count;
        state.shipping_fee = payload.shipping_fee;
        state.out_of_stock_products = payload.out_of_stock_products;
        state.buy_product_item = payload.buy_product_item;
      })
      .addCase(AddToWishlist.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(AddToWishlist.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(AddToWishlist.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.wishlist_count =
          state.wishlist_count > 0 ? state.wishlist_count + 1 : 1;
      })
      .addCase(GetWishlistProducts.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.wishlist_products = payload.wishlist_products;
        state.wishlist_count = payload.wishlist_products.length;
      })
      .addCase(RemoveWishlist.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.wishlist_products = state.wishlist_products.filter(
          (product) => product._id !== payload.wishlistId
        );
        state.successMessage = payload.message;
      });
  },
});

export const { clearMessage, ResetCountCart } = CartReducer.actions;

export default CartReducer.reducer;
