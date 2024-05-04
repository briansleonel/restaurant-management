import { IOrderDetail } from "./order-details";

export interface IOrder {
    id: string;
    description: string;
    orderDate: Date;
    amount: number;
    details: Array<IOrderDetail>;
}
