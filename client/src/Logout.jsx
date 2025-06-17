import { useEffect } from "react";
import { useStore } from "./ContextApi/Store";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
    const { removeTokenFrLs } = useStore();
    const navigate = useNavigate();

    useEffect(() => {
        removeTokenFrLs();
        navigate("/");
    }, [removeTokenFrLs, navigate]);
}