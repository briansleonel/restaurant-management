import { Button, Card, Drawer, Input, InputNumber, Space } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/hooks.redux";
import { IProduct } from "../../types/product";
import { updateNumberItemsOrderDetail } from "../../store/features/order.slice";
import Title from "antd/es/typography/Title";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { setOpenDrawer } from "../../store/features/drawer.slice";
import { useState } from "react";

export default function DrawerOrder() {
    const dispatch = useAppDispatch();
    const { amount, description, details } = useAppSelector(
        (state) => state.order
    );
    const { open } = useAppSelector((state) => state.drawer);

    const [inputDesc, setInputDesc] = useState("");

    const showDrawer = () => {
        dispatch(setOpenDrawer(true));
    };

    const onClose = () => {
        dispatch(setOpenDrawer(false));
    };

    const onChangeItems = (value: number, product: IProduct) => {
        dispatch(updateNumberItemsOrderDetail({ items: value, product }));
    };

    return (
        <>
            <button
                className="rounded px-4 py-2 text-white bg-neutral-800 hover:bg-neutral-700 transition-all flex gap-3 items-center font-normal"
                onClick={showDrawer}
            >
                <span className="hidden md:inline text-neutral-100 uppercase text-sm">
                    Order
                </span>
                <ShoppingCartIcon className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <Drawer
                title="New Order"
                placement="right"
                width={700}
                onClose={onClose}
                open={open}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="primary" onClick={onClose}>
                            Finalize order
                        </Button>
                    </Space>
                }
            >
                <div className="flex flex-col gap-6">
                    <div>
                        <label className="">Description</label>
                        <Input
                            className="mt-1"
                            value={inputDesc}
                            onChange={(e) => setInputDesc(e.target.value)}
                        />
                    </div>
                    {details.map((detail, index) => (
                        <Card key={index} bordered hoverable>
                            <div className="flex flex-col md:grid md:grid-cols-3 gap-4">
                                <img
                                    className="object-cover object-center w-full h-36 lg:h-40 rounded-md"
                                    alt="example"
                                    src={detail.product.image}
                                />
                                <div className="flex flex-col col-span-2 gap-6 justify-between">
                                    <div className="flex flex-col gap-4">
                                        <Title
                                            className="w-full truncate"
                                            level={4}
                                        >
                                            {detail.product.name}
                                        </Title>

                                        <div className="flex justify-between items-center">
                                            <span className="w-fit font-semibold text-orange-500 bg-orange-50/80 border border-orange-200 rounded px-4 py-1">
                                                ${detail.product.price}
                                            </span>

                                            <span className="font-semibold text-lg">
                                                ${detail.subTotal}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                                        <InputNumber
                                            min={1}
                                            max={20}
                                            defaultValue={1}
                                            className="w-full"
                                            onChange={(value) =>
                                                onChangeItems(
                                                    value ?? 1,
                                                    detail.product
                                                )
                                            }
                                        />
                                        <Button
                                            className="p-2 flex items-center justify-center bg-red-500 hover:!bg-red-600"
                                            type="primary"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}

                    <div className="bg-neutral-900 p-8 rounded-md text-white flex flex-col gap-8">
                        <p className="text-2xl text-end font-light">
                            Total:{" "}
                            <span className="font-medium ">${amount}</span>
                        </p>

                        <Button
                            className="uppercase "
                            size="large"
                            type="primary"
                        >
                            Finalize order
                        </Button>
                    </div>
                </div>
            </Drawer>
        </>
    );
}
