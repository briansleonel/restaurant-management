import { useEffect, useState } from "react";
import { __instanceAxios } from "../config/axios.config";
import Title from "antd/es/typography/Title";
import { Button, Card, Skeleton, message } from "antd";
import MainContainer from "../components/Layout/MainContainer";
import CardsContainer from "../components/Layout/CardsContainer";
import Meta from "antd/es/card/Meta";
import { useNavigate, useParams } from "react-router-dom";
import { IProduct } from "../types/product";
import { setOpenDrawer } from "../store/features/drawer.slice";
import { addOrderDetail } from "../store/features/order.slice";
import { IOrderDetail } from "../types/order-details";
import { useAppDispatch } from "../store/hooks.redux";

function RestaurantProductsPage() {
    const { restaurantId } = useParams();
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<Array<IProduct>>();

    const [messageApi, contextHolder] = message.useMessage();

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
        async function getProducts() {
            if (restaurantId)
                await __instanceAxios
                    .get(`/restaurants/${restaurantId}/products`)
                    .then(({ data }) => {
                        setProducts(data as Array<IProduct>);
                        setLoading(false);
                    });
        }

        getProducts();
    }, [restaurantId]);

    return (
        <>
            {contextHolder}
            <MainContainer>
                <Title level={1} className="text-center !mb-0">
                    Products
                </Title>

                <div className="flex gap-8 justify-end">
                    <Button
                        type="default"
                        onClick={() =>
                            navigate(`/restaurants/${restaurantId}/orders`)
                        }
                        className="w-full md:w-fit"
                    >
                        Show orders
                    </Button>
                </div>

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

export default RestaurantProductsPage;
