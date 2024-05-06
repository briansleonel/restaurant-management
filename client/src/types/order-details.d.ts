import { IProduct } from "./product";

export interface IOrderDetail {
    product: IProduct;
    items: number;
    subTotal: number;
}

export interface IOrderDetailWithProductId extends IOrderDetail {
    product: string;
}

export interface IOrderDetailWithId extends IOrderDetail {
    id: string;
}
