import { useState, useEffect } from "react";
import { useStore } from "../../ContextApi/Store";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import { Address } from "./Modal/Address";
import logo from "../../logo.png";

export const Cart = () => {
    const navigate = useNavigate();

    const { isLogin, showToast, userData, cartItems, getCartItems, cartTotSave } = useStore();
    const [addressModal, setAddressModal] = useState(false);
    const [address, setAddress] = useState("");

    const [total, setTotal] = useState({
        price: 0,
        offPrice: 0,
        totPrice: 0,
        totOffPrice: 0,
        handlingFee: 15,
        delivery: 0,
        gst: 0
    });

    if (!isLogin) {
        navigate("/");
    }

    useEffect(() => {
        setTotal({
            price: 0,
            offPrice: 0,
            totPrice: 0,
            totOffPrice: 0,
            handlingFee: 15,
            delivery: 0,
            gst: 0
        });

        //! Calculate Total OfferPrice and Price
        let tmpOff = 0, tmpPrice = 0;
        cartItems.map((ele) => {
            if (ele.productId.quantity > 0) {
                setTotal((prev) => ({ ...prev, ["offPrice"]: (prev.offPrice + (ele.productId.offer_price * ele.quantity)) }));
                setTotal((prev) => ({ ...prev, ["price"]: (prev.price + (ele.productId.price * ele.quantity)) }));

                tmpOff += (ele.productId.offer_price * ele.quantity);
                tmpPrice += (ele.productId.price * ele.quantity);
            }
        });
        setTotal((prev) => ({ ...prev, ["delivery"]: (tmpOff < 400 ? 30 : ((tmpOff > 400 && tmpOff < 700) ? 15 : 0)) }));
        setTotal((prev) => ({ ...prev, ["gst"]: ((tmpOff * 1) / 100) }));

        tmpOff = Math.ceil(tmpOff + 15 + ((tmpOff < 400 ? 30 : ((tmpOff > 400 && tmpOff < 700) ? 15 : 0)) + ((tmpOff * 1) / 100)));
        setTotal((prev) => ({ ...prev, ["totOffPrice"]: tmpOff }));

        tmpPrice = Math.ceil(tmpPrice + 15 + ((tmpPrice < 400 ? 30 : ((tmpPrice > 400 && tmpPrice < 700) ? 15 : 0)) + ((tmpPrice * 1) / 100)));

        setTotal((prev) => ({ ...prev, ["totPrice"]: tmpPrice }));


        //! Set Address for User Details Section
        !!userData && setAddress(userData.address.houseNo + ", " + userData.address.apartment + " " + (!!userData.address.suite && "near " + userData.address.suite) + ", " + userData.address.city + " - " + userData.address.pincode);
    }, [cartItems, userData]);





    //! Update Cart Quantity
    const updateCart = async (id, quantity) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}update-cart`, {
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



    //! Razorpay Payment
    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };



    const payNow = async () => {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            return;
        }

        const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}order/create-order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: total.totOffPrice * 100,
            }),
        }).then((t) => t.json());


        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Enter your Razorpay Key ID
            amount: data.amount,
            currency: data.currency,
            name: 'Grease & Glory',
            description: 'Test Transaction',
            image: logo,
            order_id: data.id,
            handler: function (response) {
                verifyPayment(response);
            },
            prefill: {
                name: userData.username,
                email: userData.email,
                contact: userData.phone,
            },
            notes: {
                address: address,
            },
            theme: {
                color: '#662249',
            },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    }


    const verifyPayment = async (paymentResponse) => {
        try {
            const res = await fetch('http://localhost:3001/order/place-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    order_id: paymentResponse.razorpay_order_id,
                    signature: paymentResponse.razorpay_signature,
                    user: userData,
                    items: cartItems,
                    bill: total,
                    payment: {
                        status: true,
                        payment_id: paymentResponse.razorpay_payment_id,
                    }
                }),
            });
            const myRes = await res.json();

            if (res.ok) {
                showToast(myRes.message, "success");
                getCartItems(userData.email);
            }
            else {
                showToast(myRes.message, "error");
            }
        } catch (err) {
            showToast(err.message, "error");
        }
    };




    return (
        <>
            {cartItems.length > 0 && <div className="cart-container" id="cart">
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

                                                <button className="increment-btn" onClick={() => {
                                                    if (ele.quantity === 10 && ele.productId.quantity > 10) {
                                                        showToast("You can order maximum 10 quantities", "error");
                                                    }
                                                    else if (ele.quantity === ele.productId.quantity) {
                                                        showToast(`Only ${ele.quantity} quantity is available`, "error");
                                                    }
                                                    else {
                                                        updateCart(ele._id, ele.quantity + 1)
                                                    }
                                                }}><i className="fa-solid fa-plus"></i></button>
                                            </div>
                                            <div className="price-div">
                                                <p className="price">{(ele.productId.price !== ele.productId.offer_price) && "₹" + ele.productId.price}</p>
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
                                <p><span style={{ color: "grey", textDecoration: "line-through" }}>{(total.price !== total.offPrice) && "₹" + total.price}</span>&ensp;<span>₹{total.offPrice}</span></p>
                            </div>
                            <div className="handling-fee">
                                <p title="GreaseGlory ensures on time packaging and dispatch of order to enable quick & damage free deliveries" style={{ borderBottom: "1px dashed grey" }}>Handling Fee</p>
                                <p>+₹15</p>
                            </div>
                            <div className="partner-fee">
                                <p title="₹30 for Order<₹400,   ₹15 for Order>400 and Order<700" style={{ borderBottom: "1px dashed grey" }}>Delivery Partner Fee</p>
                                <p>{total.offPrice < 400 ? "+₹30" : (total.offPrice > 400 && total.offPrice < 700) ? "+₹15" : <><span style={{ color: "grey", textDecoration: "line-through" }}>₹15</span>&ensp;<span style={{ color: "rgb(27, 166, 114)" }}>FREE</span></>}</p>
                            </div>
                            <div className="gst-charge">
                                <p title="Grease & Glory plays no role in taxes and charges levied by the Government - GST on Item Total" style={{ borderBottom: "1px dashed grey" }}>GST and Charges</p>
                                <p>+₹{(total.offPrice * 1) / 100}</p>
                            </div>
                            <div className="to-pay">
                                <p style={{ color: "black" }}>To Pay</p>
                                <p>{total.price !== total.offPrice && <span style={{ color: "grey", textDecoration: "line-through" }}>{total.totPrice}</span>}&ensp;
                                    ₹{total.totOffPrice}</p>
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
                                <p>{!!address && address}</p>
                            </div>

                            {addressModal && <Address oldAddress={!!userData.address && userData.address} setAddressModal={setAddressModal} />}
                            <button onClick={() => setAddressModal(true)}>Change Address</button>
                        </div>
                    </div>
                </div>


                {/*//! Bottom Payment btn */}
                <div className="bottom-payment-form">
                    <div className="to-pay-heading">
                        <h5>To Pay:&ensp;₹{total.totOffPrice}&nbsp;

                            {total.price !== total.offPrice && <span style={{ color: "grey", fontWeight: "500", textDecoration: "line-through" }}>{total.totPrice}</span>}
                        </h5>
                        <a href="#cart">View Detailed Bill</a>
                    </div>
                    <button onClick={() => { (!address) ? setAddressModal(true) : payNow() }}>{(!!address) ? "Place Order Now" : "Proceed with address"}</button>
                </div>
            </div>}

            {cartItems.length <= 0 && <section>
                <div className="decoration-box left-top"></div>
                <div className="decoration-box left-bottom"></div>
                <div className="decoration-box right-bottom"></div>

                <div className="empty-cart-container">
                    <h1>Your cart is empty now.</h1>
                    <button onClick={() => navigate("/food")}>Add Foods</button>
                </div>
            </section>}
        </>
    );
}