import "./Orders.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../ContextApi/Store";

export const Orders = () => {
    const navigate = useNavigate();
    const { isLogin, showToast, userData, cartItems, getCartItems, cartTotSave } = useStore();

    const [orders, setOrders] = useState([]);
    const [togOrder, setTogOrder] = useState("");

    if (!isLogin) {
        navigate("/");
    }


    //! Fetch All Orders
    const fetchOrders = async () => {
        try {
            const res = await fetch("http://localhost:3001/user/orders", {
                method: "GET",
                headers: {
                    "Email": userData.email
                }
            });
            const orders = await res.json();

            if (res.ok) setOrders(orders);
            else showToast("Something went wrong", "error");
        }
        //
        catch (err) {
            showToast(err.message, "error");
        }
    }

    useEffect(() => {
        !!userData && fetchOrders();
    }, [userData]);


    return (
        <section>
            <div className="decoration-box left-top"></div>
            <div className="decoration-box left-bottom"></div>
            <div className="decoration-box right-bottom"></div>

            <div className="orders-container">
                {orders.length > 0 && <div className="filters">
                    <div className="filter-group">
                        <label for="time-period">Time Period</label>
                        <select id="time-period">
                            <option value="30">Last 30 days</option>
                            <option value="180">Last 6 months</option>
                            <option value="all" selected>All time</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label for="status">Status</label>
                        <select id="status">
                            <option value="all" selected>All</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="failed">Failed</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label for="search">Search Order ID</label>
                        <input type="text" id="search" placeholder="Enter order ID" />
                    </div>
                    <div className="filter-group filter-actions">
                        <button className="btn btn-primary">
                            <i className="fas fa-filter"></i> Apply Filters
                        </button>
                        <button className="btn btn-outline" style={{ marginLeft: "10px" }}>
                            <i className="fas fa-times"></i> Clear
                        </button>
                    </div>
                </div>}

                {orders.length > 0 && <div className="orders-list">
                    {orders.map((ele) => {
                        let date = ele.date.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });

                        return (<article className="order-card">
                            <div className="order-header" onClick={() => togOrder === ele._id ? setTogOrder("") : setTogOrder(ele._id)}>
                                <div className="order-meta">
                                    <div className="order-id">{ele._id}
                                        <button className="copy-btn" title="Copy Order ID">
                                            <i className="far fa-copy"></i>
                                        </button>
                                    </div>
                                    <div className="order-date">
                                        <i className="far fa-calendar-alt"></i> {date}
                                    </div>
                                    <div className={`order-status status-${ele.status}`}>
                                        <i className="fas fa-check-circle"></i> {ele.status}
                                    </div>
                                </div>
                                <button className={`toggle-btn ${togOrder === ele._id && "rotated"}`}>
                                    <i className="fas fa-chevron-down"></i>
                                </button>
                            </div>
                            <div className={`order-details ${togOrder === ele._id && "active"}`}>
                                <div className="detail-section">
                                    <h3 className="section-title">
                                        <i className="fas fa-user"></i> User Details
                                    </h3>
                                    <div className="user-details-grid">
                                        <div className="detail-item">
                                            <div className="detail-label">Username</div>
                                            <div className="detail-value">{ele.user.username}</div>
                                        </div>
                                        <div className="detail-item">
                                            <div className="detail-label">Email</div>
                                            <div className="detail-value">{ele.user.email}</div>
                                        </div>
                                        <div className="detail-item">
                                            <div className="detail-label">Phone</div>
                                            <div className="detail-value">+91 {ele.user.phone}</div>
                                        </div>
                                        <div className="detail-item">
                                            <div className="detail-label">Delivery Address</div>
                                            <div className="detail-value">{ele.user.address.houseNo + ", " + ele.user.address.apartment + " " + (!!ele.user.address.suite && "near " + ele.user.address.suite) + ", " + ele.user.address.city + " - " + ele.user.address.pincode}</div>
                                        </div>
                                    </div>
                                </div>


                                <div className="detail-section">
                                    <h3 className="section-title">
                                        <i className="fas fa-utensils"></i> Order Items
                                    </h3>
                                    <div className="order-items">
                                        {ele.items.map((item) => {
                                            return (
                                                <div className="order-item">
                                                    <img src={item.productId.img} alt="Margherita Pizza" className="item-image" />
                                                    <div className="item-details">
                                                        <div className="item-header">
                                                            <h4 className="item-name">{item.productId.name}</h4>
                                                            <div className="item-price">
                                                                <span className="original-price">{(item.productId.price !== item.productId.offer_price) && "₹" + item.productId.price}</span>
                                                                <span className="offer-price">₹{item.productId.offer_price}</span>
                                                            </div>
                                                        </div>
                                                        <p className="item-description">{item.productId.description}</p>
                                                        <div className="item-meta">
                                                            <span className="item-category">{item.productId.category}</span>
                                                            <span className="veg-indicator">
                                                                <i className={`fas fa-circle ${item.productId.veg ? "veg-icon" : "non-veg-icon"}`}></i> {item.productId.veg ? "Veg" : "Non-Veg"}
                                                            </span>
                                                            <span className="item-quantity">Qty: {item.quantity}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>


                                <div className="detail-section">
                                    <h3 className="section-title">
                                        <i className="fas fa-receipt"></i> Bill Details
                                    </h3>
                                    <table className="bill-table">
                                        <tbody>
                                            <tr>
                                                <td>Item Total</td>
                                                <td>₹{ele.bill.offPrice}</td>
                                            </tr>
                                            <tr>
                                                <td>Handling Fee</td>
                                                <td>₹15</td>
                                            </tr>
                                            <tr>
                                                <td>Delivery Partner Fee</td>
                                                <td>{ele.bill.delivery > 0 ? "₹" + ele.bill.delivery : "FREE"}</td>
                                            </tr>
                                            <tr>
                                                <td>GST & Charges</td>
                                                <td>₹{ele.bill.gst}</td>
                                            </tr>
                                            <tr>
                                                <td>Discount</td>
                                                <td>-₹{ele.bill.price - ele.bill.offPrice}</td>
                                            </tr>
                                            <tr>
                                                <td>Grand Total</td>
                                                <td>₹{ele.bill.totOffPrice}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>


                                <div className="detail-section">
                                    <h3 className="section-title">
                                        <i className="fas fa-credit-card"></i> Payment Information
                                    </h3>
                                    <div className="payment-details">
                                        <div className="detail-item">
                                            <div className="detail-label">Payment Method</div>
                                            <div className="detail-value">{ele.payment.status ? "Razorpay" : "Cash on Delivery"}</div>
                                        </div>
                                        <div className="detail-item">
                                            <div className="detail-label">Payment ID</div>
                                            <div className="detail-value">{ele.payment.payment_id}</div>
                                        </div>
                                        <div className="detail-item">
                                            <div className="detail-label">Payment Status</div>
                                            <div className="detail-value">{ele.payment.status ? "Completed" : "Pending"}</div>
                                        </div>
                                        <div className="detail-item">
                                            <div className="detail-label">Transaction Time</div>
                                            <div className="detail-value">{date}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>)
                    })}
                </div>}


                {orders.length <= 0 && <div className="empty-state">
                    <div className="empty-icon">
                        <i className="far fa-clipboard"></i>
                    </div>
                    <h3 className="empty-message">No orders found</h3>
                    <button className="btn btn-secondary">
                        <i className="fas fa-utensils"></i> Browse Menu
                    </button>
                </div>}
            </div>
        </section>
    )
}