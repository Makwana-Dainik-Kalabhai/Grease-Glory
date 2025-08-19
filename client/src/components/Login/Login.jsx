import { useState } from "react";
import "./Login.css";
import { useStore } from "../../ContextApi/Store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";




export const Login = () => {
    const navigate = useNavigate();

    const { setDisSignup, setDisLogin, isLoading, setIsLoading, showLoader, showToast, storeTokenInLs } = useStore();

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
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
            let myRes = await res.json();

            if (res.ok) {
                if (myRes.isAdmin) navigate("/admin");

                storeTokenInLs(myRes.token);

                setUser({ email: "", password: "" });
                showToast(myRes.message, "success");
                setDisLogin(false);
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



    //! Google Login
    const loginWithGoogle = async (data) => {
        try {
            const res = await fetch(process.env.REACT_APP_BACKEND_URL + "auth/google-login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username: data.name, email: data.email })
            });
            const myRes = await res.json();

            if (res.ok) {
                storeTokenInLs(myRes.token);

                showToast(myRes.message, "success");
                setDisLogin(false);
            }
            else {
                showToast(myRes.message, "error");
            }
            //
        } catch (err) {
            showToast(err.message, "error");
        }
    }


    return (
        <div className="login-modal-back">
            <div className="login-modal">
                <i className="fa-solid fa-xmark close-modal" onClick={() => { setDisLogin(false); }}></i>

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


                    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}>
                        <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
                            onSuccess={credentialResponse => {
                                loginWithGoogle(jwtDecode(credentialResponse.credential));
                            }}
                            onError={(err) => {
                                showToast(err, "error");
                            }}
                            useOneTap
                        />
                    </GoogleOAuthProvider>
                </form>
            </div>
        </div>
    );
}