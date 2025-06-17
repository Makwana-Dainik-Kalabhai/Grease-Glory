import { useState } from "react";
import "./Login.css";
import { useStore } from "../../ContextApi/Store";

export const Login = ({ setDisSignup, setDisLogin }) => {

    const { isLoading, setIsLoading, showLoader, storeTokenInLs } = useStore();

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const handleInput = (e) => {
        const { name, value } = e.target;

        setUser((prev) => ({ ...prev, [name]: value }));
    }

    const handleForm = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch("http://localhost:3001/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });

            let myRes = await res.json();
            storeTokenInLs(myRes.token);
            setUser({ email: "", password: "" });
            setIsLoading(false);
            setDisLogin(false);
            //
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="login-modal-back">
            <div className="login-modal">
                <i className="fa-solid fa-xmark" onClick={() => { setDisLogin(false); }}></i>

                <form onSubmit={handleForm}>
                    <h1><span>Login</span> <sub>now</sub></h1>
                    <div className="form-group">
                        <input type="email" name="email" placeholder="Email ID" value={user.email} onChange={handleInput} />
                        <i className="fa-solid fa-envelope"></i>
                    </div>

                    <div className="form-group">
                        <input type="text" name="password" placeholder="Password" value={user.password} onChange={handleInput} />
                        <i className="fa-solid fa-lock"></i>
                    </div>

                    <button type="submit">{isLoading ? showLoader(20, 20, "white") : "Login"}</button>
                    <p>Are You Registered? <span className="signup-link" onClick={() => { setDisLogin(false); setDisSignup(true); }}>signUp</span></p>
                </form>
            </div>
        </div>
    );
}