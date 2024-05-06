import { Button, Card, Skeleton } from "antd";
import Title from "antd/es/typography/Title";
import MainContainer from "../components/Layout/MainContainer";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { __instanceAxios } from "../config/axios.config";
import CardsContainer from "../components/Layout/CardsContainer";
import { IOrderWithIdAndDate } from "../types/order";
import { getTimeAgo } from "../utils/getTimeAgo";
import { CalendarIcon } from "@heroicons/react/24/outline";

function RestaurantOrdersPage() {
    const { restaurantId } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState<Array<IOrderWithIdAndDate>>();

    useEffect(() => {
        async function getOrders() {
            if (restaurantId)
                await __instanceAxios
                    .get(`/restaurants/${restaurantId}/orders`)
                    .then(({ data }) => {
                        console.log(data);
                        setLoading(false);
                        setOrders(data);
                    });
        }

        getOrders();
    }, [restaurantId]);

    return (
        <>
            <MainContainer>
                <Title level={1} className="text-center !mb-0">
                    Orders
                </Title>

                <div className="flex gap-8 justify-end">
                    <Button
                        type="default"
                        onClick={() =>
                            navigate(`/restaurants/${restaurantId}/products`)
                        }
                        className="w-full md:w-fit"
                    >
                        Back
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
                        {orders && orders.length > 0 ? (
                            orders.map((order) => (
                                <Card
                                    key={order.id}
                                    bordered={false}
                                    hoverable
                                    title={order.description}
                                    className="flex flex-col h-full"
                                    styles={{ body: { height: "100%" } }}
                                >
                                    <div className="flex flex-col justify-between h-full w-full gap-8">
                                        <ul className="list-disc text-sm text-neutral-600">
                                            {order.details.map((detail) => (
                                                <li className="mt-1 flex items-center gap-2">
                                                    <span className="font-semibold">
                                                        {detail.items}
                                                    </span>
                                                    <span className="truncate w-full">
                                                        {detail.product.name}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="flex flex-col gap-3">
                                            <p className="flex gap-2 items-center justify-end text-sm font-medium text-neutral-500 ">
                                                Amount:{" "}
                                                <span className="w-fit font-semibold text-orange-500 bg-orange-50/80 border border-orange-200 rounded px-2 py-1 text-base">
                                                    ${order.amount}
                                                </span>
                                            </p>
                                            <p className="text-end text-neutral-400 italic text-xs flex items-center justify-end gap-2">
                                                <CalendarIcon className="w-4 h-4" />
                                                <span>
                                                    {getTimeAgo(
                                                        new Date(
                                                            order.orderDate
                                                        )
                                                    )}
                                                </span>
                                            </p>
                                        </div>
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

export default RestaurantOrdersPage;
