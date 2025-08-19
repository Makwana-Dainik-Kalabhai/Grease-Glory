import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "./admin/components/Header";
import { Sidebar } from "./admin/components/Sidebar";
import { Footer } from "./admin/components/Footer";

import { useStore } from "./ContextApi/Store";
import { ContextProvider } from "./admin/ContextApi/Store";


export default function AdminLayout() {

    const navigate = useNavigate();
    const { token, userData } = useStore();


    useEffect(() => {
        if (userData && userData.isAdmin) {
            import("./admin/assets/css/nucleo-icons.css");
            import("./admin/assets/css/nucleo-svg.css");
            import("./admin/assets/css/argon-dashboard-tailwind.css?v=1.0.1");
            import("@coreui/coreui-pro/dist/css/coreui.min.css");
        }

        const timeOut = setTimeout(() => {
            if (!token || !userData || (!!userData && !userData.isAdmin)) navigate("/");
        }, 100);

        return clearTimeout(timeOut);
    });

    return (
        <ContextProvider>
            <div className="m-0 font-sans text-base antialiased font-normal dark:bg-slate-900 leading-default bg-gray-50 text-slate-500">
                <div className="absolute w-full bg-blue-500 dark:hidden min-h-75"></div>
                <Sidebar />

                <main className="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
                    <Header />
                    <div className="w-full px-6 py-6 mx-auto">
                        <Outlet />
                        <Footer />
                    </div>
                </main>
            </div>
        </ContextProvider>
    );
}