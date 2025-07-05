import "./Orders.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../ContextApi/Store";
import { OrderCard } from "./OrderCard/OrderCard";

export const Orders = () => {
    const navigate = useNavigate();
    const { isLogin, isLoading, setIsLoading, showLoader, showToast, userData } = useStore();

    const [orders, setOrders] = useState([]);
    const [togOrder, setTogOrder] = useState("");

    //! Filters
    const [filter, setFilter] = useState({
        time: "All",
        status: "Processing",
        orderId: ""
    });


    if (!isLogin) {
        navigate("/");
    }


    //! Fetch All Orders
    const fetchOrders = async (filter) => {
        setIsLoading(true);
        try {
            const res = await fetch("http://localhost:3001/user/orders", {
                method: "GET",
                headers: {
                    "Email": userData.email,
                    "time": filter.time,
                    "status": filter.status,
                    "orderId": filter.orderId
                }
            });
            const orders = await res.json();

            if (res.ok) {
                setOrders(orders);
                setIsLoading(false);
            }
            else showToast("Something went wrong at Client Side", "error");
        }
        //
        catch (err) {
            showToast(err.message, "error");
        }
    }

    useEffect(() => {
        !!userData && fetchOrders({ time: "All", status: "Processing", orderId: "" });
    }, [userData]);



    //! Apply Filter
    const applyFilter = (key, value) => {
        setFilter((prev) => ({ ...prev, [key]: value }));

        if (key === "time")
            fetchOrders({ time: value, status: filter.status, orderId: filter.orderId });
        else if (key === "status")
            fetchOrders({ time: filter.time, status: value, orderId: filter.orderId });
        else if (key === "orderId")
            fetchOrders({ time: filter.time, status: filter.status, orderId: value });
    }


    return (
        <section>
            <div className="decoration-box left-top"></div>
            <div className="decoration-box left-bottom"></div>
            <div className="decoration-box right-bottom"></div>

            <div className="orders-container">
                {(orders.length > 0 || (!!filter.status || !!filter.orderId)) && <div className="filters">
                    <div className="filter-group">
                        <label htmlFor="time-period">Time Period</label>
                        <select id="time-period" value={filter.time} onChange={(e) => applyFilter("time", e.target.value)}>
                            <option value="All">All time</option>
                            <option value="30">Last 30 days</option>
                            <option value="180">Last 6 months</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label htmlFor="status">Status</label>
                        <select id="status" value={filter.status} onChange={(e) => applyFilter("status", e.target.value)}>
                            <option value="All">All</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="Processing">Processing</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label htmlFor="search">Search Order ID</label>
                        <input type="text" value={filter.orderId} onChange={(e) => applyFilter("orderId", e.target.value)} placeholder="Enter order ID" />
                    </div>
                </div>}

                {isLoading && showLoader(70, 70, "#662249")}
                {!isLoading && orders.length > 0 && <div className="orders-list">
                    {orders.map((ele) => {
                        return <OrderCard ele={ele} showToast={showToast} togOrder={togOrder} setTogOrder={setTogOrder} filter={filter} fetchOrders={fetchOrders} key={ele._id} />
                    })}
                </div>
                }


                {!isLoading && orders.length <= 0 && <div className="empty-state">
                    <div className="empty-icon">
                        <i className="far fa-clipboard"></i>
                    </div>
                    <h3 className="empty-message">No orders found</h3>
                    <button className="btn btn-secondary" onClick={() => navigate("/food")}>
                        <i className="fas fa-utensils"></i> Browse Menu
                    </button>
                </div>}
            </div>
        </section>
    )
}