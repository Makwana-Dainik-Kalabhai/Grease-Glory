import "./Signup.css";
import { useState } from "react";
import { useStore } from "../../ContextApi/Store";

export const Signup = ({ setDisSignup, setDisLogin }) => {

    const { isLoading, setIsLoading, showLoader, showToast, storeTokenInLs } = useStore();

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        phone: ""
    });

    const handleInput = (e) => {
        const { name, value } = e.target;

        setUser((prev) => ({
            ...prev,
            [name]: value
        }));
    }


    const handleForm = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch("http://localhost:3001/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user),
            });
            const myRes = await res.json();

            if (res.ok) {
                storeTokenInLs(myRes.token);

                setUser({
                    username: "",
                    email: "",
                    password: "",
                    phone: ""
                });
                setDisSignup(false);

                showToast(myRes.message, "success");
            }
            else {
                showToast(myRes.message, "error");
            }
            //
        }
        catch (err) {
            showToast(err.message, "error");
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="signup-modal-back">
            <div className="signup-modal">
                <i className="fa-solid fa-xmark" onClick={() => { setDisSignup(false); }}></i>

                <form onSubmit={handleForm}>
                    <h1><span>signUp</span> <sub>now</sub></h1>
                    <div className="form-group">
                        <input type="text" name="username" placeholder="Username" value={user.username} onChange={handleInput} required />
                        <i className="fa-solid fa-user"></i>
                    </div>

                    <div className="form-group">
                        <input type="email" name="email" placeholder="Email ID" value={user.email} onChange={handleInput} required />
                        <i className="fa-solid fa-envelope"></i>
                    </div>

                    <div className="form-group">
                        <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleInput} required />
                        <i className="fa-solid fa-lock"></i>
                    </div>
                    <div className="form-group">
                        <input type="text" name="phone" placeholder="Phone No." value={user.phone} onChange={handleInput} required />
                        <i className="fa-solid fa-phone"></i>
                    </div>

                    <button type="submit">{isLoading ? showLoader(20, 20, "white") : "signUp"}</button>

                    <p>Are You Registered? <span className="login-link" onClick={() => { setDisSignup(false); setDisLogin(true); }}>Login</span></p>
                </form>
            </div>
        </div>
    );
}