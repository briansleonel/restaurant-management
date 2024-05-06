import { RouteObject, createBrowserRouter } from "react-router-dom";
import ProductsPage from "../../pages/Products";
import RestaurantsPage from "../../pages/Restaurants";
import Layout from "../Layout/Layout";
import RestaurantProductsPage from "../../pages/RestaurantProducts";
import RestaurantOrdersPage from "../../pages/RestaurantOrders";

const routes: Array<RouteObject> = [
    {
        path: "/",
        element: <Layout />,
        //errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <RestaurantsPage />,
                index: true,
            },
            {
                path: "products",
                element: <ProductsPage />,
            },

            {
                path: "restaurants",
                element: <RestaurantsPage />,
            },

            {
                path: "restaurants/:restaurantId/products",
                element: <RestaurantProductsPage />,
            },
            {
                path: "restaurants/:restaurantId/orders",
                element: <RestaurantOrdersPage />,
            },
        ],
    },
];

const router = createBrowserRouter(routes);

export default router;
