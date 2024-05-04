import { Disclosure } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import DrawerOrder from "../Drawer/Drawer";

const navigation = [
    { name: "Home", href: "/" },
    { name: "Restaurants", href: "/restaurants" },
    { name: "Products", href: "/products" },
];

function NavBar() {
    return (
        <Disclosure as="nav" className="bg-neutral-900">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-neutral-400 hover:bg-neutral-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">
                                        Open main menu
                                    </span>
                                    {open ? (
                                        <XMarkIcon
                                            className="block h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <Bars3Icon
                                            className="block h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <span className="text-lg text-white font-medium">
                                        RestaurantsM
                                    </span>
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <NavLink
                                                key={item.name}
                                                to={item.href}
                                                className="text-neutral-300 hover:bg-neutral-800 hover:text-white rounded-md px-3 py-2"
                                            >
                                                {item.name}
                                            </NavLink>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <DrawerOrder />
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as={NavLink}
                                    to={item.href}
                                    className="text-neutral-300 hover:bg-neutral-800 hover:text-white rounded-md px-3 py-2"
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}

export default NavBar;

/**
 * <Navbar>
            <Navbar.Brand href="/">Restaurant Management</Navbar.Brand>
            <Nav>
                <NavLink to="/" id="home">
                    <Nav.Item as="div">Home</Nav.Item>
                </NavLink>
                <NavLink to="/restaurants" id="restaurants">
                    <Nav.Item as="div">Restaurants</Nav.Item>
                </NavLink>
                <NavLink to="/products" id="products">
                    <Nav.Item as="div">Products</Nav.Item>
                </NavLink>
            </Nav>
        </Navbar>
 */
