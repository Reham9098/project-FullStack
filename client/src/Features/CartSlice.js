import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addToCart = createAsyncThunk("cart/addToCart", async ({ userId, productId }) => {
  const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/addToCart`, { userId, productId });
  return res.data.cart;
  
});

export const getCart = createAsyncThunk("cart/getCart", async (userId) => {
  const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/getCart/${userId}`);
  return res.data;
});

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ userId, productId, action }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/updateCartQuantity`, {
        userId,
        productId,
        action,
      });
      return res.data.cart;
    } catch (err) {
      return rejectWithValue(err.response.data.error);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/removeFromCart`, {
        data: { userId, productId },
      });
      return res.data.cart;
    } catch (err) {
      return rejectWithValue(err.response.data.error);
    }
  }
);




const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null,
    status: "idle",
    error: null, 
  },
  reducers: {
    clearCartError(state) {
      state.error = null; // Reducer to clear error
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.error = null; // clear error on success
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        //Handle errors from backend
        state.error = action.error?.message || "Failed to update cart quantity";
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.error = action.payload || "Failed to remove product";
      });
  },
});
export const { clearCartError } = cartSlice.actions;

export default cartSlice.reducer;
