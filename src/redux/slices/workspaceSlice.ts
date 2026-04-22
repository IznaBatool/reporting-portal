import axiosConfig from "../../axiosConfig";
import { showSnackbar } from './snackbarSlice';
import { handleApiError } from '../utils/apiErrorHandler';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddWorkspacePayload, AddWorkspaceResponse, FetchWorkspacePayload, FetchWorkspaceResponse, IworkspaceState, UpdateWorkspacePayload, UpdateWorkspaceResponse, WorkspaceTypes } from './../../types/IworkspaceTypes';


const initialState: IworkspaceState = {
    workspaces: [],
    currentWorkspace: null,
    workspaceLogo: null,
}

export const createWorkspace = createAsyncThunk<AddWorkspaceResponse, AddWorkspacePayload>(
    '/workspace',
    async (data, { rejectWithValue, dispatch }) => {
        try {
            const res = await axiosConfig.post<AddWorkspaceResponse>('/workspace', data);
            dispatch(showSnackbar({ message: "Workspace created successfuly!", severity: "success" }));
            return res.data;
        } catch (error) {
            return handleApiError(error, "Failed, please try again!", dispatch, rejectWithValue);
        }
    }
);

export const fetchWorkspace = createAsyncThunk<FetchWorkspaceResponse, FetchWorkspacePayload>(
    `/workspace/fetchWorkspace`,
    async (data, { rejectWithValue, dispatch }) => {
        try {
            const res = await axiosConfig.get<FetchWorkspaceResponse>(`/workspace/${data.id}`);
            return res.data;
        } catch (error) {
            return handleApiError(error, "Failed, please try again!", dispatch, rejectWithValue);
        }
    }
);

export const updateWorkspace = createAsyncThunk<UpdateWorkspaceResponse, UpdateWorkspacePayload>(
    'workspace/updateWorkspace',
    async (data, { rejectWithValue, dispatch }) => {
        try {
            const res = await axiosConfig.put<AddWorkspaceResponse>(`/workspace/${data.id}`, data);
            dispatch(showSnackbar({ message: "Workspace created successfuly!", severity: "success" }));
            return res.data;
        } catch (error) {
            return handleApiError(error, "Failed, please try again!", dispatch, rejectWithValue);
        }
    }
)

const workspaceSlice = createSlice({
    name: "workspace",
    initialState,
    reducers: {
        setSelectedWorkspace: (state, action: PayloadAction<WorkspaceTypes>) => {
            state.currentWorkspace = action.payload;
        },
        setWorkspaceLogo: (state, action: PayloadAction<string | null>) => {
            state.workspaceLogo = action.payload;
        }
    },
    extraReducers: (buillder) => {
        buillder.addCase(fetchWorkspace.fulfilled, (state, actions) => {
            state.currentWorkspace = actions.payload.data;
        })
    }
})

export const { setSelectedWorkspace, setWorkspaceLogo } = workspaceSlice.actions;
export default workspaceSlice.reducer