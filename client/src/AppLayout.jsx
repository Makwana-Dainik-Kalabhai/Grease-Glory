import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useStore } from "./ContextApi/Store";
import { useEffect } from "react";


export const AppLayout = () => {
    const navigate = useNavigate();
    const { token, userData } = useStore();

    useEffect(() => {
        if (!!userData && userData.isAdmin) navigate("/admin");

        const timeOut = setTimeout(() => {
            if (!token || !userData || (!!userData && !userData.isAdmin)) navigate("/");
        }, 200);

        return clearTimeout(timeOut);
    });

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}