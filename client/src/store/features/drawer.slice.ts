import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface State {
    open: boolean;
}

const initialState: State = {
    open: false,
};

const drawerSlice = createSlice({
    name: "drawer",
    initialState,
    reducers: {
        openCloseDrawer: function (state) {
            state.open = !state.open;
        },
        setOpenDrawer: function (state, action: PayloadAction<boolean>) {
            state.open = action.payload;
        },
    },
});

export const { openCloseDrawer, setOpenDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;
