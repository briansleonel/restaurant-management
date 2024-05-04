import { useEffect, useState } from "react";
import { __instanceAxios } from "../config/axios.config";
import Title from "antd/es/typography/Title";
import { Card, Skeleton } from "antd";
import MainContainer from "../components/Layout/MainContainer";
import CardsContainer from "../components/Layout/CardsContainer";
import Meta from "antd/es/card/Meta";

function RestaurantsPage() {
    const [loading, setLoading] = useState(true);

    const [restaurants, setRestaurants] = useState<Array<IRestaurant>>([]);

    useEffect(() => {
        async function getRestaurants() {
            await __instanceAxios.get("/restaurants").then(({ data }) => {
                setRestaurants(data as Array<IRestaurant>);
                setLoading(false);
            });
        }

        getRestaurants();
    }, []);

    return (
        <MainContainer>
            <Title level={1} className="text-center">
                Restaurants
            </Title>

            {loading ? (
                <CardsContainer>
                    <Skeleton active />
                    <Skeleton active />
                    <Skeleton active />
                </CardsContainer>
            ) : (
                <CardsContainer>
                    {restaurants.map((r) => (
                        <Card
                            key={r.id}
                            bordered={false}
                            hoverable
                            cover={<img alt="example" src={r.image} />}
                        >
                            <Meta title={r.name} description={r.description} />
                        </Card>
                    ))}
                </CardsContainer>
            )}
        </MainContainer>
    );
}

export default RestaurantsPage;
