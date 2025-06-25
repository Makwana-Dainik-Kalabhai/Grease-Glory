import "./Food.css";
import { useState, useEffect } from "react";
import { useStore } from "../../ContextApi/Store";
import { FoodModal } from "./FoodModal/FoodModal";
import { useNavigate } from "react-router-dom";

export const Food = () => {
    const navigate = useNavigate();

    const { setDisSignup, disLogin, setDisLogin, isLogin, isLoading, setIsLoading, showLoader, showToast, userData, cartItems, getCartItems, cartTotSave } = useStore();
    const [foods, setFoods] = useState([]);
    const [categories, setCategories] = useState("");
    const [filterCategory, setFilterCategory] = useState("all");
    const [foodModal, setFoodModal] = useState("");


    //! Set Filter
    const setFilter = (category) => {
        setIsLoading(true);
        setFilterCategory("");

        setTimeout(() => {
            setFilterCategory(category);
            setIsLoading(false);
        }, 100);
    }


    //! Fetch All Foods
    const fetchFoods = async () => {
        setIsLoading(true);
        try {
            const api = await fetch(`${process.env.REACT_APP_BACKEND_URL}foods`);
            const data = await api.json();

            if (!!data) {
                setFoods(data);
                setCategories([...new Map(data.map(item => [item.category, item])).values()]);
            }

            else
                showToast(data.message, "error");
        }
        catch (err) {
            showToast(err.message, "error");
        }
        finally {
            setIsLoading(false);
        }
    }


    //! Add Item to Cart
    const addToCart = async (productId) => {
        if (isLogin) {
            setIsLoading(true);
            try {
                const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}add-cart`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ productId, email: userData.email, quantity: 1 })
                });
                const myRes = await res.json();

                if (res.ok) {
                    getCartItems(userData.email);
                }
                else showToast(myRes.message, "error");
            }
            //
            catch (err) {
                showToast(err.message, "error");
            }
            setIsLoading(false);
        }
        else {
            setDisSignup(false);
            setDisLogin(true);
            showToast("Please! Login First", "warn");
        }
    }


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
            console.error(err.message);
        }
    }

    useEffect(() => {
        fetchFoods();
    }, [cartItems]);


    return (
        <section>
            <div className="decoration-box left-top"></div>
            <div className="decoration-box left-bottom"></div>
            <div className="decoration-box right-bottom"></div>

            <div className="category-filter">
                <span>Filter By:</span>&nbsp;
                {categories && categories.map((ele) => {
                    return (
                        <button className={(filterCategory && filterCategory === ele.category) ? "active" : ""} key={ele.category} value={ele.category} onClick={() => setFilter(ele.category)}>{ele.category}</button>
                    )
                })}
            </div>

            {foods && <div className="food-grid">
                {foods.map((ele, i) => {
                    const filteredCart = cartItems && cartItems.filter(cartEle => cartEle.productId._id === ele._id);
                    filteredCart && JSON.stringify(filteredCart);

                    return <div className={`food-card ${(filterCategory && filterCategory === ele.category || filterCategory === "all") ? "show-food" : ""}`} key={ele._id} style={{ opacity: ele.quantity <= 0 && 0.7 }}>
                        <div className="food-img">
                            <img src={ele.img} alt={ele.name} onClick={() => setFoodModal(ele._id)} />
                            <div className="add-cart-btn">
                                {(ele.quantity > 0 && filteredCart && filteredCart.length > 0) ? <>
                                    <button className="decrement-btn" onClick={() => updateCart(filteredCart[0]._id, filteredCart[0].quantity - 1)}><i className="fa-solid fa-minus"></i></button>

                                    <input type="number" value={filteredCart[0].quantity} readOnly />

                                    <button className="increment-btn" onClick={() => {
                                        if (filteredCart[0].quantity == 10 && ele.quantity > 10) {
                                            showToast("You can order maximum 10 quantities", "error");
                                        }
                                        else if (filteredCart[0].quantity == ele.quantity) {
                                            showToast(`Only ${ele.quantity} quantity is available`, "error");
                                        }
                                        else {
                                            updateCart(filteredCart[0]._id, filteredCart[0].quantity + 1)
                                        }
                                    }}><i className="fa-solid fa-plus"></i></button>

                                </> : <button className="add-btn" onClick={() => ele.quantity > 0 && addToCart(ele._id)}>{ele.quantity <= 0 ? "Sold Out" : "ADD"}</button>}
                            </div>
                        </div>

                        <div className="food-details" onClick={() => setFoodModal(ele._id)}>
                            <img className="veg-icon" src={ele.veg ? "https://png.pngitem.com/pimgs/s/151-1515150_veg-icon-png-circle-transparent-png.png" : "https://www.pngkey.com/png/full/245-2459071_non-veg-icon-non-veg-symbol-png.png"} alt="" />

                            <h2 className="name">{ele.name}</h2>
                            <h5 className="category">{ele.category}</h5>
                            <div>
                                {ele.price !== ele.offer_price && <><span className="price">₹{ele.price}</span><span>&ensp;</span></>}
                                <span className="offer-price">₹{ele.offer_price}</span>
                            </div>
                            <p>{ele.description}</p>
                        </div>
                    </div>
                })}

                {cartItems && cartItems.length !== 0 && <div className="view-cart-container">
                    <div className="product-imgs">
                        {!!cartItems && cartItems.map((ele, ind) => {
                            return ind < 5 && <img src={ele.productId.img} alt={ele.productId.name} key={ind} />
                        })}
                    </div>
                    <div className="details">
                        <p className="total-items">{cartItems.length} Items <i className="fa-solid fa-angle-up"></i></p>
                        <p className="total-save">{cartTotSave > 0 && "₹" + cartTotSave + " Save"}</p>
                    </div>
                    <button className="view-cart-btn" onClick={() => navigate("/cart")}>View Cart</button>
                </div>}
            </div>
            }
            {isLoading && showLoader(70, 70, "#e88630")}

            {foodModal !== null && <FoodModal productId={foodModal} foods={foods} setFoodModal={setFoodModal} />}
        </section >
    );
}