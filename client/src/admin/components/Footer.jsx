import { NavLink } from "react-router-dom";

export const Footer = () => {
    return (
        <footer className="pt-4">
            <div className="w-full px-6 mx-auto">
                <div className="flex flex-wrap items-center -mx-3 lg:justify-between">
                    <div className="w-full max-w-full px-3 mt-0 mb-6 shrink-0 lg:mb-0 lg:w-1/2 lg:flex-none">
                        <div className="text-sm leading-normal text-center text-white lg:text-left">
                            ©{new Date().getFullYear() + ","}
                            made with <i className="fa fa-heart"></i> by Grease & Glory
                        </div>
                    </div>
                    <div className="w-full max-w-full px-3 mt-0 shrink-0 lg:w-1/2 lg:flex-none">
                        <ul className="flex flex-wrap justify-center pl-0 mb-0 list-none lg:justify-end">
                            <li className="nav-item">
                                <NavLink to="/admin" className="block px-4 pt-0 pb-1 text-sm font-normal transition-colors ease-in-out text-white">Dashboard</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/admin/users" className="block px-4 pt-0 pb-1 text-sm font-normal transition-colors ease-in-out text-white">Users</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/admin/foods" className="block px-4 pt-0 pb-1 text-sm font-normal transition-colors ease-in-out text-white">Foods</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/admin/orders" className="block px-4 pt-0 pb-1 text-sm font-normal transition-colors ease-in-out text-white">Orders</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}