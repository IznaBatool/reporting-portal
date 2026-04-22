import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import snackbarReducer from "../slices/snackbarSlice"
import sidebarReducer from "../slices/sidebarSlice"
import workspaceReducer from "../slices/workspaceSlice"
import dataIngestionReducer from "../slices/dataIngestionSlice"
import dataSourceReducer from "../slices/dataSourceSlice";


const rootReducer = combineReducers({
    auth: authReducer,
    snackbar: snackbarReducer,
    sidebar: sidebarReducer,
    workspace: workspaceReducer,
    dataIngestion: dataIngestionReducer,
    dataSource: dataSourceReducer
});

export default rootReducer;
