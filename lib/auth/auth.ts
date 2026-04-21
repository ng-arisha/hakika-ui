import { BASE_URL } from "@/utils/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";


interface InitialAuthState {
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    access_token: string | null;
    refresh_token: string | null;
    user: User | null;
}

const initialState: InitialAuthState = {
    loading: 'idle',
    access_token: null,
    refresh_token: null,
    user: null,
}

export const login = createAsyncThunk(
    "auth/login",
    async (
      data: { username: string; password: string },
      { rejectWithValue }
    ) => {
      try {
        console.log(`url: ${BASE_URL}auth/login`);
        const response = await fetch(`${BASE_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        console.log(response);
        const res = await response.json();
  
        if (!response.ok) {
          return rejectWithValue(res.message);
        }
        return res;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

  export const register = createAsyncThunk(
    "auth/register",
    async (
      data: { username: string; password: string,name:string },
      { rejectWithValue }
    ) => {
      try {
        console.log(`url: ${BASE_URL}auth/register`);
        const response = await fetch(`${BASE_URL}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        console.log(response);
        const res = await response.json();
  
        if (!response.ok) {
          return rejectWithValue(res.message);
        }
        return res;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
      logout: (state) => {
        state.access_token = null;
        state.refresh_token = null;
        state.user = null;
        toast.success("Logged out successfully!");
      }
    },
    extraReducers: (builder) => {

        // Login
        builder.addCase(login.pending, (state) => {
            state.loading = "pending";
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.access_token = action.payload.data.tokens.accessToken;
            state.refresh_token = action.payload.data.tokens.refreshToken;
              state.user = action.payload.data.user;
              toast.success("Login successful!");
        });
        builder.addCase(login.rejected, (state,{payload}) => {
            state.loading = "failed";
            console.error("Login failed:", payload);
            toast.error(`Login failed: ${payload}`);
        });


        // Register

        builder.addCase(register.pending, (state) => {
            state.loading = "pending";
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.access_token = action.payload.data.tokens.accessToken;
            state.refresh_token = action.payload.data.tokens.refreshToken;
              state.user = action.payload.data.user;
            toast.success("Registration successful.");
        });
        builder.addCase(register.rejected, (state,{payload}) => {
            state.loading = "failed";
            console.error("Registration failed:", payload);
            toast.error(`Registration failed: ${payload}`);
        });
    }
  })

  export const { logout } = authSlice.actions;

export const authReducer = authSlice.reducer;