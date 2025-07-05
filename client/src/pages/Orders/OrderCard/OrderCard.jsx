export const OrderCard = ({ ele, showToast, togOrder, setTogOrder, filter, fetchOrders }) => {

    const cancelOrder = async (_id) => {
        try {
            const res = await fetch("http://localhost:3001/cancel-order", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ _id, items: ele.items })
            });
            const myRes = await res.json();

            if (res.ok) {
                fetchOrders({ time: filter.time, status: "Processing", orderId: filter.orderId });
                showToast(myRes.message, "success");
            }
            else showToast(myRes.message, "error");
            //
        }
        catch (err) {
            showToast(err.message, "error");
        }
    }

    return (
        <article className="order-card">
            <div className="order-header" style={{backgroundColor: ele.status==="Cancelled"?"#ffe6e6":(ele.status==="Completed")?"#e6ffe6":"#fff6e6"}} onClick={() => togOrder === ele._id ? setTogOrder("") : setTogOrder(ele._id)}>
                <div className="order-meta">
                    <div className="order-id">{ele._id}
                    </div>
                    <div className="order-date">
                        <i className="far fa-calendar-alt"></i>&ensp;{new Date(ele.date).toLocaleDateString("en-in")} {new Date(Number.parseFloat(ele.time)).toLocaleTimeString("en-in")}
                    </div>
                    <div className={`order-status status-${ele.status}`}>
                        <i className={`fas fa-${ele.status === "Completed" ? "check-circle" : (ele.status === "Processing" ? "clock" : "xmark")}`}></i>&nbsp;{ele.status}
                    </div>
                    {ele.status === "Processing" && <button className="btn btn-outline" onClick={() => { window.confirm("Are you sure to cancel the order?") && cancelOrder(ele._id) }}>Cancel</button>}
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
                                <div className="order-item" key={item.productId._id}>
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
                                <td>+₹15</td>
                            </tr>
                            <tr>
                                <td>Delivery Partner Fee</td>
                                <td style={{ color: ele.bill.delivery <= 0 && "rgb(27, 166, 114)" }}>{ele.bill.delivery > 0 ? "+₹" + ele.bill.delivery : "FREE"}</td>
                            </tr>
                            <tr>
                                <td>GST & Charges</td>
                                <td>+₹{ele.bill.gst}</td>
                            </tr>
                            <tr>
                                <td style={{ color: "rgb(27, 166, 114)" }}>Discount</td>
                                <td style={{ color: "rgb(27, 166, 114)" }}>-₹{ele.bill.price - ele.bill.offPrice}</td>
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
                            <div className="detail-value">{ele.payment.payment_id ? ele.payment.payment_id : "-------------"}</div>
                        </div>
                        <div className="detail-item">
                            <div className="detail-label">Payment Status</div>
                            <div className="detail-value" style={{ fontWeight: 600, color: ele.payment.status ? "rgb(27, 166, 114)" : "red" }}>{ele.payment.status ? "Completed" : "Pending"}</div>
                        </div>
                        <div className="detail-item">
                            <div className="detail-label">Transaction Time</div>
                            <div className="detail-value">{new Date(ele.date).toLocaleDateString("en-us", {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })} {ele.time}</div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}