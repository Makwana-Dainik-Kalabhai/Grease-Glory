import "./Header.css";
import { useState, useEffect } from "react";
import logo from "../../logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { Signup } from "../Signup/Signup";
import { Login } from "../Login/Login";
import { useStore } from "../../ContextApi/Store";

const Header = () => {

    const navigate = useNavigate();

    const { disSignup, setDisSignup, disLogin, setDisLogin, isLogin, cartItems } = useStore();
    const [disMenus, setDisMenus] = useState(false);
    const [moreMenus, setMoreMenus] = useState(false);

    useEffect(() => {
        setDisMenus(false);
    }, [isLogin, disSignup, disLogin]);

    return (
        <>
            <nav className="laptop-nav">
                <div>
                    <img src={logo} className="logo" alt="Img not Found" onClick={()=>navigate("/")} />
                </div>
                <div>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/food">Foods</NavLink>
                    <NavLink to="/recipe">Recipes</NavLink>
                    <NavLink to="/contact">Contact Us</NavLink>

                    {isLogin &&
                        <button className="more-menu-btn" onMouseEnter={() => setMoreMenus(true)} onMouseLeave={() => setMoreMenus(false)}>More&nbsp;
                            <i className="fa-solid fa-angle-down" style={{ transition: "all 0.3s linear", transform: moreMenus ? "rotate(180deg)" : "rotate(0deg)" }}></i>
                            <div className="more-menus" style={{ display: moreMenus ? "flex" : "none" }}>
                                <NavLink to="/orders">Orders</NavLink>
                                <NavLink to="/profile">Account</NavLink>
                                <NavLink to="/logout">Logout</NavLink>
                            </div>
                        </button>}
                    {isLogin && <>

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
            </nav >

            <nav className="mobile-nav">
                <div>
                    <img src={logo} className="logo" alt="Img not Found" onClick={()=>navigate("/")} />
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

            {disSignup && <Signup />}
            {disLogin && <Login />}
        </>
    );
}

export default Header;