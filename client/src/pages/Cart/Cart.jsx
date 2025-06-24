import { useState } from "react";
import { useStore } from "../../ContextApi/Store";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

export const Cart = () => {
    const navigate = useNavigate();

    const { isLogin, isLoading, setIsLoading, showLoader, showToast, userData, getUserData, cartItems, getCartItems, cartTotSave } = useStore();

    const [address, setAddress] = useState();

    if (!isLogin) {
        navigate("/");
    }
    let cartTotPrice = 0;
    let cartTotOffPrice = 0;

    //! Update Cart Quantity
    const updateCart = async (id, quantity) => {
        try {
            const res = await fetch("http://localhost:3001/update-cart", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, quantity })
            });
            const myRes = await res.json();

            if (res.ok) {
                getCartItems(userData.email);
            }
            else {
                showToast(myRes.message, "error");
            }
            //
        }
        //
        catch (err) {
            showToast(err.message, "error");
        }
    }



    //! Update User Address
    const updateAddress = async (id) => {
        try {
            const myUser = { ...userData, address };

            const res = await fetch("http://localhost:3001/user/update", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(myUser)
            });
            const myRes = await res.json();

            if (res.ok) getUserData();
            else showToast(myRes.message, "error");
            //
        }
        //
        catch (err) {
            showToast(err.message, "error");
        }
    }



    //! Payment Now
    const handlePayment = (e) => {
        e.preventDefault();
    }




    return (
        <div className="cart-container" id="cart">
            {/*//! Total Save Section */}
            {cartTotSave > 0 && <h5 className="total-save sections">₹{cartTotSave} saved! on this order</h5>}

            {/*//! Sold Out Products */}
            <div className="sold-products sections">
                <h5>Currently Unavailable (<span style={{ fontSize: "0.85em" }}>We will not deliver this sold out foods</span>)</h5>

                <div className="items">
                    {cartItems.map((ele) => {
                        return (
                            ele.productId.quantity <= 0 && <div className="item" key={ele._id}>
                                <img src={ele.productId.img} alt="" />
                                <div className="details">
                                    <p className="name">{ele.productId.name}</p>
                                    <p className="category">{ele.productId.category}&ensp;
                                        <span className="veg" style={{ border: `1px solid ${ele.productId.veg ? "#33cc8f" : "red"}`, color: ele.productId.veg ? "#33cc8f" : "red" }}>{ele.productId.veg ? "Veg" : "Non-Veg"}</span>
                                    </p>
                                </div>

                                <div>
                                    <span>Sold out</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="products-container container">
                <h5>Review your Order</h5>

                {/*//! Products Sections */}
                <div className="products sections">
                    <div className="heading">
                        <p className="delivery">60 Mins</p>
                        <p className="item-number">{cartItems.length} Items</p>
                    </div>
                    <div className="items">
                        {cartItems.map((ele) => {
                            if (ele.productId.quantity > 0) {
                                cartTotPrice += (ele.productId.price * ele.quantity);
                                cartTotOffPrice += (ele.productId.offer_price * ele.quantity);
                            }

                            return (
                                ele.productId.quantity > 0 && <div className="item" key={ele._id}>
                                    <img src={ele.productId.img} alt="" />
                                    <div className="details">
                                        <p className="name">{ele.productId.name}</p>
                                        <p className="category">{ele.productId.category}&ensp;
                                            <span className="veg" style={{ border: `1px solid ${ele.productId.veg ? "#33cc8f" : "red"}`, color: ele.productId.veg ? "#33cc8f" : "red" }}>{ele.productId.veg ? "Veg" : "Non-Veg"}</span>
                                        </p>
                                    </div>

                                    <div className="quantity-price">
                                        <div className="quantity">
                                            <button className="decrement-btn" onClick={() => updateCart(ele._id, ele.quantity - 1)}><i className="fa-solid fa-minus"></i></button>
                                            <input type="number" value={ele.quantity} readOnly />
                                            <button className="increment-btn" onClick={() => updateCart(ele._id, ele.quantity + 1)}><i className="fa-solid fa-plus"></i></button>
                                        </div>
                                        <div className="price-div">
                                            <p className="price">{(ele.productId.price != ele.productId.offer_price) && "₹" + ele.productId.price}</p>
                                            <p className="offer-price">₹{ele.productId.offer_price}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/*//! Missed Something Section */}
                <div className="missed-something sections">
                    <p>Missed Something?&ensp;<button onClick={() => navigate("/food")}>Add more items</button></p>
                </div>


                {/*//! Biil Details Section */}
                <div className="bill-container container">
                    <h5>Bill Details</h5>

                    <div className="bill-section sections">
                        <div className="item-total">
                            <p>Item Total</p>
                            <p><span style={{ color: "grey", textDecoration: "line-through" }}>{(cartTotPrice != cartTotOffPrice) && "₹" + cartTotPrice}</span>&ensp;<span>₹{cartTotOffPrice}</span></p>
                        </div>
                        <div className="handling-fee">
                            <p title="GreaseGlory ensures on time packaging and dispatch of order to enable quick & damage free deliveries" style={{ borderBottom: "1px dashed grey" }}>Handling Fee</p>
                            <p>+₹15</p>
                        </div>
                        <div className="partner-fee">
                            <p title="₹30 for Order<₹400,   ₹15 for Order>400 and Order<700" style={{ borderBottom: "1px dashed grey" }}>Delivery Partner Fee</p>
                            <p>{cartTotOffPrice < 400 ? "+₹30" : (cartTotOffPrice > 400 && cartTotOffPrice < 700) ? "+₹15" : <><span style={{ color: "grey", textDecoration: "line-through" }}>₹15</span>&ensp;<span style={{ color: "rgb(27, 166, 114)" }}>FREE</span></>}</p>
                        </div>
                        <div className="gst-charge">
                            <p title="Grease & Glory plays no role in taxes and charges levied by the Government - GST on Item Total" style={{ borderBottom: "1px dashed grey" }}>GST and Charges</p>
                            <p>+₹{(cartTotOffPrice * 1) / 100}</p>
                        </div>
                        <div className="to-pay">
                            <p style={{ color: "black" }}>To Pay</p>
                            <p><span style={{ color: "grey", textDecoration: "line-through" }}>{(cartTotPrice != cartTotOffPrice) && "₹" + Math.ceil(cartTotPrice + 15 + ((cartTotPrice < 400 ? 30 : ((cartTotPrice > 400 && cartTotPrice < 700) ? 15 : 0)) + ((cartTotPrice * 1) / 100)))}</span>&ensp;
                                ₹{Math.ceil(cartTotOffPrice + 15 + ((cartTotOffPrice < 400 ? 30 : ((cartTotOffPrice > 400 && cartTotOffPrice < 700) ? 15 : 0)) + ((cartTotOffPrice * 1) / 100)))}</p>
                        </div>
                    </div>
                </div>


                {/*//! User Details Section */}
                <div className="user-container container">
                    <h5>User Details</h5>

                    <div className="user-section sections">
                        <div className="name">
                            <p>Username</p>
                            <p>{userData.username}</p>
                        </div>
                        <div className="phone">
                            <p>Phone Number</p>
                            <p>+91 {userData.phone}</p>
                        </div>
                        <div className="address">
                            <p>Address</p>
                            <p>{!!userData.address && userData.address}</p>
                        </div>
                    </div>
                </div>
            </div>


            {/*//! Bottom Payment btn */}
            <div className="bottom-payment-form">
                <div className="to-pay-heading">
                    <h5>To Pay:&ensp;₹{Math.ceil(cartTotOffPrice + 15 + ((cartTotOffPrice < 400 ? 30 : ((cartTotOffPrice > 400 && cartTotOffPrice < 700) ? 15 : 0)) + ((cartTotOffPrice * 1) / 100)))}&nbsp;

                        <span style={{ color: "grey", fontWeight: "500", textDecoration: "line-through" }}>{(cartTotPrice != cartTotOffPrice) && "₹" + Math.ceil(cartTotPrice + 15 + ((cartTotPrice < 400 ? 30 : ((cartTotPrice > 400 && cartTotPrice < 700) ? 15 : 0)) + ((cartTotPrice * 1) / 100)))}</span></h5>
                    <a href="#cart">View Detailed Bill</a>
                </div>
                <form onSubmit={handlePayment}>
                    {!userData.address && <div className="form-group">
                        <textarea placeholder="Enter Address ...." value={address} onChange={(e) => setAddress(e.target.value)}>{address}</textarea>

                        <i className="fa-solid fa-location-dot"></i>
                    </div>}
                    <button disabled={cartTotOffPrice <= 0} onClick={() => updateAddress(userData._id)}>{(!!userData.address) ? "Place Order Now" : "Proceed with address"}</button>
                </form>
            </div>
        </div>
    );
}