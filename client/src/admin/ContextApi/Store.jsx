import { createContext, useContext, useEffect, useState } from "react";
import { useStore } from "../../ContextApi/Store";

export const Store = createContext();

export const ContextProvider = ({ children }) => {

    const { token, userData, showToast } = useStore();
    const [allUsers, setAllUsers] = useState([]);
    const [allFoods, setAllFoods] = useState([]);
    const [allOrders, setAllOrders] = useState([]);



    //* Users
    const getAllUsers = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}admin/users`,
                {
                    method: "GET",
                    headers: {
                        "Authorization": token,
                        "_id": userData._id
                    }
                }
            );
            if (res.ok) {
                const users = await res.json();

                if (users) setAllUsers(users);
            }

        } catch (err) {
            showToast(err.message, "error");
        }
    }



    //* Foods
    const getAllFoods = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}foods`);

            if (res.ok) {
                const foods = await res.json();
                setAllFoods(foods);
            }

        } catch (err) {
            showToast(err.message, "error");
        }
    }



    //* Orders
    const getAllOrders = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}admin/orders`, {
                method: "GET",
                headers: {
                    "Authorization": token,
                }
            });

            if (res.ok) {
                const orders = await res.json();
                setAllOrders(orders);
            }
        } catch (err) {
            showToast(err.message, "error");
        }
    }



    useEffect(() => {
        getAllFoods();
        getAllOrders();

        !!userData && getAllUsers();

    }, [userData]);

    const values = {
        allUsers,
        allFoods,
        allOrders,
        getAllUsers,
        getAllFoods,
        getAllOrders
    }

    return <Store.Provider value={values}>
        {children}
    </Store.Provider>
}

export const useAdminStore = () => { return useContext(Store) }