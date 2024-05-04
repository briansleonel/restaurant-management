export interface IProduct {
    id: string;
    name: string;
    price: number;
    image: string;
    restaurant: IRestaurant;
    createdAt: Date;
    updatedAt: Date;
}
