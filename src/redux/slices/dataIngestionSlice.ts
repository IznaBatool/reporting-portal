import { DatabaseSetupPayload, DatabaseSetupResponse, ImportDataPayload, ImportDataResponse } from "@/types/IDataIngestionTypes";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { showSnackbar } from "./snackbarSlice";
import { handleApiError } from "../utils/apiErrorHandler";
import axiosConfig from "../../axiosConfig";
import JsonToTreeview from "@/utils/JsonTreeView";

interface DataIngestionState {
    method: string,
    url: string,
    apiUrl: string,
    params: object[],
    headers: object,
    urlParams: string,
    isSubmit: number,
    stepper: number,
    JsonTreeView?: object[] | null,
    record?: object | object[],
    dataKey?: string | undefined,
    importSavePayload: object
}
const initialState: DataIngestionState = {
    method: "GET",
    url: "",
    params: [],
    headers: [],
    apiUrl: "",
    urlParams: "",
    isSubmit: 0,
    stepper: 0,
    JsonTreeView: [],
    record: {},
    dataKey: "",
    importSavePayload: {}
};

export const fetchDataToImport = createAsyncThunk<ImportDataResponse, ImportDataPayload>(
    '/data-source/import-data',
    async (data, { rejectWithValue, dispatch }) => {
        try {
            const res = await axiosConfig.post<ImportDataResponse>('/data-source/import-data', data);
            dispatch(showSnackbar({ message: res.data.message, severity: "success" }));
            return res.data;
        } catch (error) {
            return handleApiError(error, "Something went wrong!", dispatch, rejectWithValue);
        }
    }
)


export const createDataSourceTable = createAsyncThunk<DatabaseSetupResponse, DatabaseSetupPayload>(
    '/data-source/create-table',
    async (data, { rejectWithValue, dispatch }) => {
        try {
            const res = await axiosConfig.post<ImportDataResponse>('/data-source/create-table', data);
            dispatch(showSnackbar({ message: res.data.message, severity: "success" }));
            return res.data;
        } catch (error) {
            return handleApiError(error, "Something went wrong!", dispatch, rejectWithValue);
        }
    }
)

const dataIngestionSlice = createSlice({
    name: "data Ingestion",
    initialState: initialState,
    reducers: {
        setStepper: (state, actions: PayloadAction<number>) => {
            state.stepper = actions.payload
        },
        setMethod: (state, actions: PayloadAction<string>) => {
            state.method = actions.payload;
        },
        setUrlParams: (state, actions: PayloadAction<string>) => {
            state.urlParams = actions.payload;
        },
        setBasicUrl: (state, actions: PayloadAction<string>) => {
            state.url = actions.payload;
            state.apiUrl = actions.payload;
        },
        setApiParams: (state, actions: PayloadAction<object[]>) => {
            state.params = actions.payload;
            state.isSubmit++;
        },
        setHeaders: (state, actions: PayloadAction<object>) => {
            state.headers = actions.payload;
            state.isSubmit++;
        },
        setSubmit: (state) => {
            state.isSubmit += 1;
        },
        setPayload: (state, actions: PayloadAction<object>) => {
            state.importSavePayload = actions.payload;
            if (state.importSavePayload?.headers && typeof state.importSavePayload.headers === "object" && !Array.isArray(state.importSavePayload.headers)) {
                state.importSavePayload.headers = Object.entries(state.importSavePayload.headers).map(([key, value]) => ({
                    key,
                    value,
                }));
            }

            if (state.importSavePayload?.url && state.importSavePayload?.apiUrl ) {
                state.importSavePayload.url = state.importSavePayload?.apiUrl;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataToImport.fulfilled, (state, actions) => {
                state.isSubmit = 0;
                state.record = actions.payload.data.record;
                state.dataKey = actions.payload.data.dataKey;
                state.JsonTreeView = JsonToTreeview.convertToTreeview(state.record as object | object[], null, true);

                state.JsonTreeView.unshift({
                    id: 1,
                    flag: "id",
                    label: "id",
                    dataType: "string",
                    disabled: true
                });
                let lastId = state.JsonTreeView.length;
                const lastNode = [
                    {
                        id: lastId += 2,
                        flag: "trx_created_at",
                        label: "mr_created_at",
                        dataType: "dateTime",
                        disabled: true
                    },
                    {
                        id: lastId += 2,
                        flag: "trx_updated_at",
                        label: "mr_updated_at",
                        dataType: "dateTime",
                        disabled: true
                    }
                ];

                state.JsonTreeView = [...state.JsonTreeView, ...lastNode];

                state.stepper = 1;
            })
            .addCase(fetchDataToImport.rejected, (state) => {
                state.isSubmit = 0;
            })
    }
});

export const { setStepper, setUrlParams, setBasicUrl, setApiParams, setHeaders, setSubmit, setMethod, setPayload } = dataIngestionSlice.actions;
export default dataIngestionSlice.reducer;