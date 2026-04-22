import axiosConfig from "../../axiosConfig";
import { LogoutResponse } from "@/types/IAuthTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleApiError } from "../utils/apiErrorHandler";

export const logout = createAsyncThunk<LogoutResponse>(
    '/logout',
    async (_, { rejectWithValue, dispatch }) => {
        try {

            const res = await axiosConfig.get<LogoutResponse>('/logout');
            return res.data;
        } catch (error) {
            return handleApiError(error, "Something went wrong!", dispatch, rejectWithValue);
        }
    }
)


const logoutSlice = createSlice({
    name: "auth",
    initialState: {},
    reducers: {},
});

export default logoutSlice.reducer;