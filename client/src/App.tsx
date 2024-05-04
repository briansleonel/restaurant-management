import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import ProductsPage from "./pages/Products";
import RestaurantsPage from "./pages/Restaurants";

function App() {
    return (
        <>
            <NavBar />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/restaurants" element={<RestaurantsPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
