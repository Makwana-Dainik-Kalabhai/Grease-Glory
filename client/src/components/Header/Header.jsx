import "./Header.css";
import { useState, useEffect } from "react";
import logo from "../../logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { Signup } from "../Signup/Signup";
import { Login } from "../Login/Login";
import { useStore } from "../../ContextApi/Store";

const Header = () => {

    const navigate = useNavigate();

    const { isLogin, cartItems } = useStore();

    const [disSignup, setDisSignup] = useState(false);
    const [disLogin, setDisLogin] = useState(false);
    const [disMenus, setDisMenus] = useState(false);

    useEffect(() => {
        setDisMenus(false);
    }, [isLogin, disSignup, disLogin]);

    return (
        <>
            <nav className="laptop-nav">
                <div>
                    <img src={logo} className="logo" alt="Img not Found" />
                </div>
                <div>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/food">Foods</NavLink>
                    <NavLink to="/recipe">Recipes</NavLink>
                    <NavLink to="/contact">Contact Us</NavLink>
                    {isLogin && <>
                        <NavLink to="/orders">Orders</NavLink>
                        <NavLink to="/logout">Logout</NavLink>
                        <i className="fa-solid fa-shopping-cart" onClick={() => navigate("/cart")}>{cartItems.length !== 0 && <span>{cartItems.length}</span>}</i>
                    </>}
                    <div className="login-btns">
                        {!isLogin &&
                            <>
                                <button onClick={() => { setDisSignup(true); }}>signUp</button>
                                <button onClick={() => { setDisLogin(true); }}>Login</button>
                            </>
                        }
                    </div>
                </div>
            </nav>

            <nav className="mobile-nav">
                <div>
                    <img src={logo} className="logo" alt="Img not Found" />
                    {disMenus &&
                        <>
                            <i className="fa-solid fa-close mobile-menu" onClick={() => setDisMenus(prev => !prev)}></i>
                            <div className="mobile-menus">
                                <NavLink to="/">Home</NavLink>
                                <NavLink to="/food">Foods</NavLink>
                                <NavLink to="/recipe">Recipes</NavLink>
                                <NavLink to="/contact">Contact Us</NavLink>
                                {!isLogin &&
                                    <>
                                        <button onClick={() => { setDisSignup(true); }}>signUp</button>
                                        <button onClick={() => { setDisLogin(true); }}>Login</button>
                                    </>
                                }
                                {isLogin && <>
                                    <NavLink to="/orders">Orders</NavLink>
                                    <NavLink to="/logout">Logout</NavLink>
                                    <NavLink to="cart">View Cart</NavLink>
                                </>}
                            </div>
                        </>
                    }
                    {!disMenus && <i className="fa-solid fa-bars mobile-menu" onClick={() => setDisMenus(prev => !prev)}></i>}
                </div>
            </nav>

            {disSignup && <Signup setDisLogin={setDisLogin} setDisSignup={setDisSignup} />}
            {disLogin && <Login setDisLogin={setDisLogin} setDisSignup={setDisSignup} />}
        </>
    );
}

export default Header;