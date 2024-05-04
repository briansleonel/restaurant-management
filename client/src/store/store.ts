import { configureStore } from "@reduxjs/toolkit";
import orderSlice from "./features/order.slice";
import drawerSlice from "./features/drawer.slice";

export const store = configureStore({
    reducer: {
        order: orderSlice,
        drawer: drawerSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
