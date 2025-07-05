import "./Food.css";
import { useState, useEffect } from "react";
import { useStore } from "../../ContextApi/Store";
import { FoodModal } from "./FoodModal/FoodModal";
import { useNavigate, useParams } from "react-router-dom";
import { FoodCard } from "./FoodCard/FoodCard";

export const Food = () => {
    const navigate = useNavigate();
    const params = useParams();

    const { token, setDisSignup, setDisLogin, isLogin, isLoading, setIsLoading, showLoader, showToast, userData, cartItems, getCartItems, cartTotSave } = useStore();
    const [foods, setFoods] = useState([]);
    const [categories, setCategories] = useState("");
    const [filterCategory, setFilterCategory] = useState(params.category ? params.category : "all");
    const [foodModal, setFoodModal] = useState("");
    const [pageSize, setPageSize] = useState(10);

    let prCount = 0;


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
                        "Content-Type": "application/json",
                        "Authorization": token
                    },
                    body: JSON.stringify({ productId, quantity: 1 })
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


    const loadMoreData = () => {
        setIsLoading(true);

        setTimeout(() => {
            setPageSize((prev) => (prev + 10));
            setIsLoading(false);
        }, 100);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchFoods();
    }, [cartItems]);


    return (
        <section className="foods-container">
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


            {/*//! Foods Grid */}
            {foods && <div className="food-grid">
                {foods.map((ele, i) => {
                    const filteredCart = cartItems && cartItems.filter(cartEle => cartEle.productId._id === ele._id);
                    filteredCart && JSON.stringify(filteredCart);

                    if (filterCategory !== "all" && filterCategory.toLowerCase() === ele.category.toLowerCase() && prCount < pageSize) {
                        prCount++;
                        return <FoodCard ele={ele} filterCategory={filterCategory} setFoodModal={setFoodModal} cartItem={filteredCart[0]} addToCart={addToCart} updateCart={updateCart} showToast={showToast} key={ele._id} />
                    }
                    else if (filterCategory === "all") {
                        return i < pageSize &&
                            <FoodCard ele={ele} filterCategory={filterCategory} setFoodModal={setFoodModal} cartItem={filteredCart[0]} addToCart={addToCart} updateCart={updateCart} showToast={showToast} key={ele._id} />
                    }
                })}
                {isLoading ? showLoader(70, 70, "#e88630") : ((filterCategory !== "all" && pageSize - 1 < prCount) ? <button className="btn btn-primary" onClick={loadMoreData}>Load More</button> : (filterCategory === "all" && (pageSize < foods.length) ? <button className="btn btn-primary" onClick={loadMoreData}>Load More</button> : ""))}






                {/* //! Bottom button to view cart */}
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

            {foodModal !== null && <FoodModal productId={foodModal} foods={foods} setFoodModal={setFoodModal} />}
        </section >
    );
}