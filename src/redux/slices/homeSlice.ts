// src/redux/slices/homeSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosConfig";


interface User {
  id: number;
  name: string;
  email: string
  // Add other user properties as needed
}

interface HomeState {
  count: number;
  loading: boolean,
  users: User[],
  error: string
}

const initialState: HomeState = {
  count: 0,
  loading: false,
  users: [],
  error: ""
};

export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
  const response = axiosInstance.get(`https://jsonplaceholder.typicode.com/users`);
  return (await response).data;
});


const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";;
      })
  }
});

export const { increment, decrement, setCount } = homeSlice.actions;
export default homeSlice.reducer;
