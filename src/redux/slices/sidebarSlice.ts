import { createSlice } from "@reduxjs/toolkit";

interface StateProps {
    open: boolean
}

const initialState: StateProps = {
    open: true,
};

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        setSidebarState: (state) => {
            state.open = !state.open
        },
    }
})

export const { setSidebarState } = sidebarSlice.actions;
export default sidebarSlice.reducer