import { BASE_URL } from "@/utils/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


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
        const response = await fetch(`${BASE_URL}auth/login`, {
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
    reducers:{},
    extraReducers: (builder) => {

        // Login
        builder.addCase(login.pending, (state) => {
            state.loading = "pending";
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.access_token = action.payload.data.tokens.access_token;
            state.refresh_token = action.payload.data.tokens.refresh_token;
              state.user = action.payload.data.user;
        });
        builder.addCase(login.rejected, (state) => {
            state.loading = "failed";
        });
    }
  })

export const authReducer = authSlice.reducer;