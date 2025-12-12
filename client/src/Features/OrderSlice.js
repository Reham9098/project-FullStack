import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, thunkAPI) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/createOrder`, orderData);
      return res.data.order;
    } catch (err) {
      console.error("Create order error:", err.response?.data || err.message);
      return thunkAPI.rejectWithValue(err.response?.data || "Error placing order");
    }
  }
);

// Get order history for a user
export const getOrdersByUser = createAsyncThunk(
  "order/getOrdersByUser",
  async (userId, thunkAPI) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/orders/${userId}`);
      return res.data;
    } catch (err) {
      console.error("Fetch order history error:", err.response?.data || err.message);
      return thunkAPI.rejectWithValue(err.response?.data || "Error fetching orders");
    }
  }
);


// Async thunk to fetch all orders for admin
export const fetchAllOrders = createAsyncThunk(
  'orders/fetchAllOrders',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/orders`); // updated route
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
    }
  }
);


const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: null,
    status: "idle",
    error: null,
    orders: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.status = "succeeded";
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(getOrdersByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrdersByUser.fulfilled, (state, action) => {
        state.orderHistory = action.payload;
        state.loading = false;
      })
      .addCase(getOrdersByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })



      .addCase(fetchAllOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchAllOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    })
    .addCase(fetchAllOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message;
    });
      
  },
});

export default orderSlice.reducer;
