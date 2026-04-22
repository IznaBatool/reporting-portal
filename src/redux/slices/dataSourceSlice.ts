import axiosConfig from '@/axiosConfig';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { handleApiError } from "../utils/apiErrorHandler";
import { showSnackbar } from './snackbarSlice';
import { DataSourceListPayload, DataSourceListResponse, FetchColumnDataPayload, FetchColumnDataResponse, FetchColumnsPayload, FetchColumnsResponse, FetchTransactionPayload, FetchTransactionResponse, SetAutomationPayload, SetAutomationResponse, UpdateDescriptionPayload, UpdateDescriptionResponse } from '@/types/IDataSourceTypes';

interface DataSourceState {
    dataSourceList: object[]
    selectedDataSource: number | null,
    transactionData: object | null
    dataSourceColumns: object | null,
};

const initialState: DataSourceState = {
    dataSourceList: [],
    selectedDataSource: null,
    transactionData: null,
    dataSourceColumns: null
}

export const fetchDataSourceList = createAsyncThunk<DataSourceListResponse, DataSourceListPayload>(
    "data-source",
    async (payload, { rejectWithValue, dispatch }) => {
        try {
            const res = await axiosConfig.get<DataSourceListResponse>("/data-source", {
                params: payload
            });
            return res.data;
        } catch (error) {
            return handleApiError(error, "Failed to fetch data source list", dispatch, rejectWithValue);
        }
    }
);

export const updateDescription = createAsyncThunk<UpdateDescriptionResponse, UpdateDescriptionPayload>(
    "update-description",
    async (payload, { rejectWithValue, dispatch }) => {
        try {
            const res = await axiosConfig.put<UpdateDescriptionResponse>(`/data-source/update-description/${payload.id}`, payload);
            dispatch(showSnackbar({
                message: res.data.message,
                severity: "success"
            }));
            return res.data;
        } catch (error) {
            return handleApiError(error, "Failed to update description", dispatch, rejectWithValue);
        }
    }
)

export const setDataSourceAutomation = createAsyncThunk<SetAutomationResponse, SetAutomationPayload>(
    "/automation/toggle-data-source",
    async (payload, { rejectWithValue, dispatch }) => {
        try {
            const res = await axiosConfig.get<SetAutomationResponse>(`/automation/toggle-data-source/`, {
                params: payload
            });
            dispatch(showSnackbar({ message: res.data.data, severity: "success" }));
            return res.data;
        } catch (error) {
            return handleApiError(error, "Failed to set automation", dispatch, rejectWithValue);
        }
    }
);

export const fetchDataSourceTransactions = createAsyncThunk<FetchTransactionResponse, FetchTransactionPayload>(
    "fetch-transactions",
    async (payload, { rejectWithValue, dispatch }) => {
        try {
            const res = await axiosConfig.get<FetchTransactionResponse>(`/data-source/${payload.id}/transactions`, {
                params: payload.search
            });
            return res.data;
        } catch (error) {
            return handleApiError(error, "Failed to fetch transactions", dispatch, rejectWithValue);
        }
    }
)

export const fetchDataSourceColumns = createAsyncThunk<FetchColumnsResponse, FetchColumnsPayload>(
    "fetch-column",
    async (payload, { rejectWithValue, dispatch }) => {
        try {
            const res = await axiosConfig.get<FetchColumnsResponse>(`/config-ingestion-ds/${payload.id}/columns`);
            return res.data;
        } catch (error) {
            return handleApiError(error, "Failed to fetch columns", dispatch, rejectWithValue);
        }
    }
)

export const fetchColumnData = createAsyncThunk<FetchColumnDataResponse, FetchColumnDataPayload>(
    "fetch-column-data",
    async (payload, { rejectWithValue, dispatch }) => {
        try {
            const res = await axiosConfig.get<FetchColumnDataResponse>(`/data-source/${payload.id}/records/${payload.column}`, {
                params: payload.pagination
            });
            return res.data;
        } catch (error) {
            return handleApiError(error, "Failed to fetch data", dispatch, rejectWithValue);
        }
    }
)

const dataSourceSlice = createSlice({
    initialState: initialState,
    name: "dataSource",
    reducers: {
        setDataSource: (state, action: PayloadAction<number>) => {
            state.selectedDataSource = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDataSourceList.fulfilled, (state, action) => {
            state.dataSourceList = action.payload.data.dataSources || [];
        });
        builder.addCase(fetchDataSourceTransactions.fulfilled, (state, action) => {
            state.transactionData = action.payload.data;
        })
        builder.addCase(fetchDataSourceColumns.fulfilled, (state, action) => {
            state.dataSourceColumns = action.payload.data;
        });
    }
})


export default dataSourceSlice.reducer
export const { setDataSource } = dataSourceSlice.actions;