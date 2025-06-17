import { useState, useEffect } from "react";

export const Food = () => {

    const [foods, setFoods] = useState([]);

    const fetchFoods = async () => {
        const api = await fetch("https://burgers-hub.p.rapidapi.com/burgers?rapidapi-key=c2a4fea7e5msh29b80547a137bf0p17e936jsn800bed27fc1e");
        const data = await api.json();
        console.log(data);
        setFoods(data);
    }

    useEffect(() => {
        fetchFoods();
    }, []);

    return (
        <div className="container food-container">
            <div className="food-grid">
                {/* {foods.map((ele) => {
                    <div className="food-card">
                        <img src={ele.images[0]} alt="" />
                    </div>
                })} */}
            </div>
        </div>
    );
}