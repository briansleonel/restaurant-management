import MainContainer from "../components/Layout/MainContainer";
import { __instanceAxios } from "../config/axios.config";
import CardsContainer from "../components/Layout/CardsContainer";
import Title from "antd/es/typography/Title";
import { Button, Card, Select, Skeleton, message } from "antd";
import { useEffect, useState } from "react";
import { IProduct } from "../types/product";
import { SearchProps } from "antd/es/input";
import Search from "antd/es/input/Search";
import { useAppDispatch } from "../store/hooks.redux";
import { IOrderDetail } from "../types/order-details";
import { addOrderDetail } from "../store/features/order.slice";
import Meta from "antd/es/card/Meta";
import { setOpenDrawer } from "../store/features/drawer.slice";

function ProductsPage() {
    const dispatch = useAppDispatch();

    const [loadingRestaurants, setLoadingRestaurants] = useState(true);
    const [restaurants, setRestaurants] = useState<Array<IRestaurant>>();

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<Array<IProduct>>();

    const [selectedRestaurant, setSelectedRestaurant] = useState<string>();

    const [messageApi, contextHolder] = message.useMessage();

    const handleChange = (e: string) => {
        setSelectedRestaurant(e);
        setLoading(true);
        setProducts([]);
    };

    const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
        console.log(info?.source, value);

    const addProduct = (product: IProduct) => {
        const orderDetail: IOrderDetail = {
            items: 1,
            product,
            subTotal: +product.price,
        };

        dispatch(addOrderDetail(orderDetail));
        dispatch(setOpenDrawer(true));

        messageApi.open({
            type: "success",
            content: "Product added to order",
            duration: 5,
        });
    };

    useEffect(() => {
        async function getRestaurants() {
            await __instanceAxios.get("/restaurants").then(({ data }) => {
                setRestaurants(data as Array<IRestaurant>);
                setLoadingRestaurants(false);
                setSelectedRestaurant(data[0].id);
            });
        }

        getRestaurants();
    }, []);

    useEffect(() => {
        async function getProducts() {
            if (selectedRestaurant)
                await __instanceAxios
                    .get(`/restaurants/${selectedRestaurant}/products`)
                    .then(({ data }) => {
                        setProducts(data as Array<IProduct>);
                        setLoading(false);
                    });
        }

        getProducts();
    }, [selectedRestaurant]);

    return (
        <>
            {contextHolder}
            <MainContainer>
                <Title level={1} className="text-center">
                    Products
                </Title>

                {restaurants ? (
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center justify-start md:gap-8">
                        <div className="col-span-1 md:col-span-2 flex-col flex md:flex-row gap-2 md:gap-4 items-start md:items-center justify-start">
                            <span className="text-start">Restaurant:</span>
                            <Select
                                defaultValue={selectedRestaurant}
                                onChange={handleChange}
                                options={restaurants.map((r) => {
                                    return { value: r.id, label: r.name };
                                })}
                                loading={loadingRestaurants}
                                className="w-full"
                            />
                        </div>
                        <Search
                            className="col-span-1 md:col-span-4"
                            placeholder="input search text"
                            onSearch={onSearch}
                            enterButton
                            allowClear
                        />
                    </div>
                ) : null}

                {loading ? (
                    <CardsContainer>
                        <Skeleton active />
                        <Skeleton active />
                        <Skeleton active />
                    </CardsContainer>
                ) : (
                    <CardsContainer>
                        {products && products.length > 0 ? (
                            products.map((product) => (
                                <Card
                                    key={product.id}
                                    bordered={false}
                                    hoverable
                                    cover={
                                        <img
                                            className="object-cover object-center h-44 lg:h-60"
                                            alt="example"
                                            src={product.image}
                                        />
                                    }
                                >
                                    <Meta title={product.name} />
                                    <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center">
                                        <span className="w-fit font-semibold text-orange-500 bg-orange-50/80 border border-orange-200 rounded px-4 py-1">
                                            ${product.price}
                                        </span>
                                        <Button
                                            className="w-full lg:w-fit"
                                            type="primary"
                                            onClick={() => addProduct(product)}
                                        >
                                            Add to order
                                        </Button>
                                    </div>
                                </Card>
                            ))
                        ) : (
                            <p className="uppercase text-center text-sm col-span-5 bg-white rounded shadow-sm p-8">
                                No data found
                            </p>
                        )}
                    </CardsContainer>
                )}
            </MainContainer>
        </>
    );
}

export default ProductsPage;
