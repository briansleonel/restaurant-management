import { RouteObject, createBrowserRouter } from "react-router-dom";
import HomePage from "../../pages/Home";
import ProductsPage from "../../pages/Products";
import RestaurantsPage from "../../pages/Restaurants";
import Layout from "../Layout/Layout";

const routes: Array<RouteObject> = [
    {
        path: "/",
        element: <Layout />,
        //errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <HomePage />,
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
        ],
    },
];

const router = createBrowserRouter(routes);

export default router;
