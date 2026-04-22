import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthState, LoginPayload, ProfileDetailPayload, ProfileDetailResponse, ResetPasswordPayload, ResetPasswordResponse, SetLogoPayload, SetLogoResponse, SetPasswordPayload, SetPasswordResponse, UpdatePasswordResponse, UpdatePasswordPayload, RefreshTokenResponse } from "@/types/IAuthTypes";
import { showSnackbar } from "./snackbarSlice";
import { handleApiError } from "../utils/apiErrorHandler";
import { fetchAuthUserApi, loginApi, refreshTokenApi, resetPasswordApi, setPasswordApi, updateLogoApi, updateProfileApi, UpdateUserPasswordApi } from "@/services/authService";
// import { persistor } from "../store";

const initialState: AuthState = {
    user: null,
    workspaces: [],
    token: localStorage.auth?.token,
    loading: false,
    error: null,
    accessToken: "",
    refreshToken: "",
    selectedWorkspace: null
}

export const login = createAsyncThunk(
    '/login',
    async (data: LoginPayload, { rejectWithValue, dispatch }) => {
        try {
            const res = await loginApi(data);
            return res;
        } catch (error) {
            return handleApiError(error, "Login failed!", dispatch, rejectWithValue);
        }
    }
);

export const resetPassword = createAsyncThunk<ResetPasswordResponse, ResetPasswordPayload>(
    '/reset-password',
    async (data, { rejectWithValue, dispatch }) => {
        try {
            const res = await resetPasswordApi(data);
            dispatch(showSnackbar({ message: res.message, severity: "success" }));
            return res;

        } catch (error) {
            return handleApiError(error, "Reset password failed!", dispatch, rejectWithValue);
        }
    }
);

export const setPassword = createAsyncThunk<SetPasswordResponse, SetPasswordPayload>(
    '/set-password',
    async (data, { rejectWithValue, dispatch }) => {
        try {
            const res = await setPasswordApi(data);
            dispatch(showSnackbar({ message: res.message, severity: "success" }));
            return res;

        } catch (error) {
            return handleApiError(error, "Failed, please try again!", dispatch, rejectWithValue);
        }
    }
);

export const updateLogo = createAsyncThunk<SetLogoResponse, SetLogoPayload>(
    '/avatar',
    async (data, { rejectWithValue, dispatch }) => {
        try {
            const res = await updateLogoApi(data);
            dispatch(showSnackbar({ message: res.message, severity: "success" }));
            return res;
        } catch (error) {
            return handleApiError(error, "Failed, please try again!", dispatch, rejectWithValue);
        }
    }
)

export const fetchAuthUser = createAsyncThunk(
    '/auth',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const res = await fetchAuthUserApi();
            return res.data;
        } catch (error) {
            return handleApiError(error, "Something went wrong!", dispatch, rejectWithValue);
        }
    }
);

export const updateProfile = createAsyncThunk<ProfileDetailResponse, ProfileDetailPayload>(
    '/profile',
    async (data, { rejectWithValue, dispatch }) => {
        try {
            const res = await updateProfileApi(data);
            dispatch(showSnackbar({ message: "Profile updated successfully", severity: "success" }));
            return res;
        } catch (error) {
            return handleApiError(error, "Failed, please try again!", dispatch, rejectWithValue);
        }
    }
)

export const UpdateUserPassword = createAsyncThunk<UpdatePasswordResponse, UpdatePasswordPayload>(
    '/change-password',
    async (data, { rejectWithValue, dispatch }) => {
        try {
            const res = await UpdateUserPasswordApi(data);
            dispatch(showSnackbar({ message: res.message, severity: "success" }));
            return res;
        } catch (error) {
            return handleApiError(error, "Failed, please try again!", dispatch, rejectWithValue);
        }
    }
)

export const refreshToken = createAsyncThunk<RefreshTokenResponse>(
    '/refresh-token',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const res = await refreshTokenApi();
            return res;
        } catch (error) {
            return handleApiError(error, "Session Expire!", dispatch, rejectWithValue);
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearAuth: () => {
            localStorage.clear();
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                localStorage.setItem("auth", JSON.stringify(action.payload.data));
                state.user = action.payload.data.userInfo;
                state.workspaces = action.payload.data.userInfo?.workspace;
                state.selectedWorkspace = action.payload.data.userInfo?.workspace?.[0];
            });
        builder
            .addCase(fetchAuthUser.fulfilled, (state, action) => {
                state.user = action.payload.userInfo;
                state.workspaces = action.payload.userInfo?.workspace;
            });
        builder.addCase(refreshToken.fulfilled, (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        })
    }
});

export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;