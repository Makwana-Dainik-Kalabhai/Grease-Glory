import "./Food.css";
import { useState, useEffect } from "react";
import { useStore } from "../../ContextApi/Store";
import { FoodModal } from "./FoodModal/FoodModal";

export const Food = () => {

    const { isLoading, setIsLoading, showLoader, showToast, userData, cartItems, getCartItems, cartTotSave } = useStore();
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
            const api = await fetch("http://localhost:3001/foods");
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
        setIsLoading(true);
        try {
            const res = await fetch("http://localhost:3001/add-cart", {
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
            console.error(err.message);
        }
    }

    useEffect(() => {
        fetchFoods();
    }, [cartItems]);


    return (
        <section>
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

                    return <div className={`food-card ${(filterCategory && filterCategory === ele.category || filterCategory === "all") ? "show-food" : ""}`} key={ele._id} onClick={() => setFoodModal(ele._id)}>
                        <div className="food-img">
                            <img src={ele.img} alt={ele.name} />
                            <div className="add-cart-btn">
                                {filteredCart && filteredCart.length > 0 ? <>
                                    <button className="decrement-btn" onClick={() => updateCart(filteredCart[0]._id, filteredCart[0].quantity - 1)}><i className="fa-solid fa-minus"></i></button>
                                    <input type="number" value={filteredCart[0].quantity} readOnly />
                                    <button className="increment-btn" onClick={() => updateCart(filteredCart[0]._id, filteredCart[0].quantity + 1)}><i className="fa-solid fa-plus"></i></button>

                                </> : <button className="add-btn" onClick={() => addToCart(ele._id)}>ADD</button>}
                            </div>
                        </div>

                        <div className="food-details">
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

                {cartItems.length !== 0 && <div className="view-cart-container">
                    <div className="product-imgs">
                        {!!cartItems && cartItems.map((ele, ind) => {
                            return ind < 5 && <img src={ele.productId.img} alt={ele.productId.name} key={ind} />
                        })}
                    </div>
                    <div className="details">
                        <p className="total-items">{cartItems.length} Items <i className="fa-solid fa-angle-up"></i></p>
                        <p className="total-save">₹{cartTotSave} Save</p>
                    </div>
                    <button className="view-cart-btn">View Cart</button>
                </div>}
            </div>
            }
            {isLoading && showLoader(70, 70, "#e88630")}

            {foodModal !== null && <FoodModal productId={foodModal} foods={foods} setFoodModal={setFoodModal} />}
        </section >
    );
}