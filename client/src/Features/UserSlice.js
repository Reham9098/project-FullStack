import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ============================
// REGISTER USER
// ============================
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/registerUser`,
        {
          name: userData.name,
          email: userData.email,
          password: userData.password,
        }
      );

      const user = response.data.user;
      const msg = response.data.msg;

      return { user, msg };
    } catch (error) {
      return rejectWithValue({
        msg: error.response?.data?.msg || "Registration failed",
      });
    }
  }
);

// ============================
// LOGIN
// ============================
export const login = createAsyncThunk(
  "users/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/login`,
        {
          email: userData.email,
          password: userData.password,
        }
      );

      const user = response.data.user;
      const msg = response.data.msg;

      return { user, msg };
    } catch (error) {
      return rejectWithValue({
        msg: error.response?.data?.msg || "Invalid credentials",
      });
    }
  }
);

// ============================
// LOGOUT
// ============================
export const logout = createAsyncThunk("users/logout", async () => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/logout`);
    const msg = response.data.msg;
    return { msg };
  } catch (err) {
    return { msg: "Logout failed" };
  }
});

// ============================
// INITIAL STATE
// ============================
const initialState = {
  user: null,
  status: null,
  msg: null,
  isLogin: false,
  isLoading: false,
  isError: false,
};

// ============================
// SLICE
// ============================
export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.msg = null; // إزالة أي رسالة سابقة
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload.user;
        state.msg = action.payload.msg; // سيتم عرضها في المودال
        // لا نغير isLogin هنا
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "rejected";
        state.msg = action.payload?.msg || "Unexpected error occurred";
      })

      // LOGIN
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.msg = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogin = true;
        state.user = action.payload.user;
        state.msg = action.payload.msg;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isLogin = false;
        state.user = null;
        state.msg = action.payload.msg;
      })

      // LOGOUT
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogin = false;
        state.user = null;
        state.msg = action.payload.msg;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default userSlice.reducer;
