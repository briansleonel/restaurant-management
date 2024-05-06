import { useEffect, useState } from "react";
import { __instanceAxios } from "../config/axios.config";
import Title from "antd/es/typography/Title";
import { Card, Skeleton, Spin } from "antd";
import MainContainer from "../components/Layout/MainContainer";
import CardsContainer from "../components/Layout/CardsContainer";
import Meta from "antd/es/card/Meta";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

function RestaurantsPage() {
    const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (!isMounted) {
            setIsMounted(true);
            return;
        }
        fetchRestaurants();
    }, [isMounted]);

    const fetchRestaurants = async () => {
        if (!hasMore || isLoading) return;
        setIsLoading(true);
        __instanceAxios
            .get(`/restaurants?page=${page}`)
            .then((response) => {
                const {
                    restaurants: newRestaurants,
                    hasMore: moreRestaurants,
                } = response.data;

                console.log(response.data);

                // Agregar los nuevos restaurantes al final de la lista existente
                setRestaurants((prevRestaurants) => [
                    ...prevRestaurants,
                    ...newRestaurants,
                ]);

                // Actualizar el estado de hasMore basado en la respuesta del servidor
                setHasMore(moreRestaurants);

                // Si no hay más datos, detener la carga infinita
                if (!moreRestaurants) {
                    setHasMore(false);
                } else {
                    setPage((prevPage) => prevPage + 1);
                }
            })
            .catch((error) => {
                console.error("Error fetching restaurants:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <MainContainer>
            <Title level={1} className="text-center !mb-0">
                Restaurants
            </Title>

            {isLoading ? (
                <CardsContainer>
                    <Skeleton active />
                    <Skeleton active />
                    <Skeleton active />
                </CardsContainer>
            ) : (
                <InfiniteScroll
                    dataLength={restaurants.length}
                    next={fetchRestaurants}
                    hasMore={hasMore}
                    loader={<Spin />}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 md:gap-12"
                >
                    {restaurants.map((r, index) => (
                        <Link to={`/restaurants/${r.id}/products`} key={index}>
                            <Card
                                bordered={false}
                                hoverable
                                cover={
                                    <img
                                        alt="example"
                                        src={r.image}
                                        className="object-cover object-center h-44 lg:h-60"
                                    />
                                }
                            >
                                <Meta
                                    title={r.name}
                                    description={r.description}
                                />
                            </Card>
                        </Link>
                    ))}
                </InfiniteScroll>
            )}
        </MainContainer>
    );
}

export default RestaurantsPage;
