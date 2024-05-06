import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IOrderDetail } from "../../types/order-details";
import { IProduct } from "../../types/product";

interface State {
    description: string;
    amount: number;
    details: Array<IOrderDetail>;
}

const initialState: State = {
    description: "",
    amount: 0,
    details: [],
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        addOrderDetail: function (state, action: PayloadAction<IOrderDetail>) {
            let exist = false;
            // verifico si ya existe el producto a agregar
            state.details.forEach((d) => {
                if (d.product.id === action.payload.product.id) {
                    ++d.items;
                    d.subTotal = d.items * action.payload.product.price;
                    exist = true;
                }
            });
            if (!exist) {
                state.details.push(action.payload);
                state.amount += action.payload.subTotal;
            }
        },
        updateNumberItemsOrderDetail: function (
            state,
            action: PayloadAction<{ product: IProduct; items: number }>
        ) {
            state.details.forEach((d) => {
                if (d.product.id === action.payload.product.id) {
                    d.items = action.payload.items;
                    d.subTotal =
                        action.payload.items * action.payload.product.price;
                }
            });

            let amount = 0;
            state.details.forEach((d) => {
                amount += d.subTotal;
            });

            state.amount = amount;
        },
        deleteOrderDetail: function (
            state,
            action: PayloadAction<IOrderDetail>
        ) {
            console.log(action.payload);

            const updated = state.details.filter(
                (o) => o.product.id !== action.payload.product.id
            );
            console.log(updated);

            state.details = updated;

            let amount = 0;
            state.details.forEach((d) => {
                amount += d.subTotal;
            });

            state.amount = amount;
        },
        resetOrder: function (state) {
            state.description = "";
            state.amount = 0;
            state.details = [];
        },
    },
});

export const {
    addOrderDetail,
    updateNumberItemsOrderDetail,
    deleteOrderDetail,
    resetOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
