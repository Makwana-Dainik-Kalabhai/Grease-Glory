import { createContext, useContext, useState, useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";

export const Store = createContext();

export const ContextProvider = ({ children }) => {

    const getTokenFrLs = () => {
        return localStorage.getItem("token");
    }

    const [token, setToken] = useState(() => getTokenFrLs());
    const [isLogin, setIsLogin] = useState(!!token);
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState("");

    const getUserData = async () => {
        try {
            const res = await fetch("http://localhost:3001/user", {
                method: "GET",
                headers: {
                    "Authorization": token
                },
            });

            if (res.ok) {
                const user = await res.json();
                setUserData(user);
                if (!!userData) {
                    console.log(userData);
                }
            }
            //
        }
        catch (err) {
            console.log(err.message);
            return "";
        }
    }


    useEffect(() => {
        getUserData();
    }, [token]);


    const storeTokenInLs = (token) => {
        setToken(token);
        setIsLogin(true);
        localStorage.setItem("token", JSON.stringify({ value: token, expiry: (new Date()).getTime() + (10 * 24 * 60 * 60) }));
    }


    const removeTokenFrLs = () => {
        setIsLogin(false);
        localStorage.removeItem("token");
        setToken("");
        return;
    }

    const showLoader = (height = 30, width = 30, color = "black") => {
        return <div className="loader">
            <RotatingLines
                visible={true}
                height={height}
                width={width}
                color="grey"
                strokeColor={color}
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    }

    return (
        <Store.Provider value={{ isLoading, setIsLoading, showLoader, token, isLogin, storeTokenInLs, getTokenFrLs, removeTokenFrLs, userData }}>
            {children}
        </Store.Provider>
    );
}

export const useStore = () => {
    return useContext(Store);
}