import { IOrderDetail } from "./order-details";

export interface IOrder {
    description: string;
    amount: number;
    details: Array<IOrderDetail>;
    restaurant: string;
}

export interface IOrderWithIdAndDate extends IOrder {
    id: string;
    orderDate: Date;
}
