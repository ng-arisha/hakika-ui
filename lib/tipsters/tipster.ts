import { BASE_URL } from "@/utils/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";


interface InitialTipStersState {
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    tipsters: TipSter[];
    allTipsters: TipSter[];
   
}

const initialState : InitialTipStersState = {
    loading: 'idle',
    tipsters: [],
    allTipsters: [],
}


export const findTopTipsters = createAsyncThunk(
    "tipsters/findTopTipsters",
    async (
      _,
      { rejectWithValue }
    ) => {
      try {
        console.log(`url: ${BASE_URL}tipsters/top`);
        const response = await fetch(`${BASE_URL}/tipsters/top`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
         
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

  export const findAllTipsters = createAsyncThunk(
    "tipsters/findAllTipsters",
    async (
      _,
      { rejectWithValue }
    ) => {
      try {
        console.log(`url: ${BASE_URL}tipsters`);
        const response = await fetch(`${BASE_URL}/tipsters`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
         
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



  const tipsterSlice = createSlice({
    name: "tipsters",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        
        builder.addCase(findTopTipsters.pending, (state) => {
            state.loading = 'pending';
        });
        builder.addCase(findTopTipsters.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.tipsters = action.payload.data;
        });
        builder.addCase(findTopTipsters.rejected, (state,{payload}) => {
            state.loading = 'failed';
            console.error("Error fetching top tipsters:", payload);
            toast.error(`Failed to fetch top tipsters: ${payload || "Unknown error"}`);
        });


        // all tipsters
        builder.addCase(findAllTipsters.pending, (state) => {
            state.loading = 'pending';
        });
        builder.addCase(findAllTipsters.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.allTipsters = action.payload.data.data;
        });
        builder.addCase(findAllTipsters.rejected, (state,{payload}) => {
            state.loading = 'failed';
            console.error("Error fetching all tipsters:", payload);
            toast.error(`Failed to fetch all tipsters: ${payload || "Unknown error"}`);
        });
    }
  })

  export const tipsterReducer = tipsterSlice.reducer;