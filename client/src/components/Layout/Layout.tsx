import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

function Layout() {
    return (
        <>
            <NavBar />
            <Outlet />
            {/*pathname !== "/" && pathname !== "/maps" && show ? <Footer /> : ""*/}
        </>
    );
}

export default Layout;
