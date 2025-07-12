import "./Hero.css";
import dish from "./dish.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../ContextApi/Store";

export const Hero = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [searchedFoods, setSearchedFoods] = useState([]);
    const { isLoading, setIsLoading, showLoader, showToast } = useStore();

    const handleSearch = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("http://localhost:3001/foods/search", {
                method: "GET",
                headers: {
                    "food": search
                }
            });
            const foods = await res.json();

            if (res.ok) setSearchedFoods(foods);
            else console.log(foods.message);
            //
        } catch (err) {
            console.log(err.message);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        search && handleSearch();
    }, [search]);

    return (
        <>
            <div className="wave">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#662249" fillOpacity="1" d="M0,192L40,208C80,224,160,256,240,272C320,288,400,288,480,277.3C560,267,640,245,720,202.7C800,160,880,96,960,80C1040,64,1120,96,1200,101.3C1280,107,1360,85,1400,74.7L1440,64L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path></svg>
                <div className="circle"></div>
                <img src={dish} alt="Img not found" />
            </div>
            <div className="hero-container">
                <h1>Grease & Glory</h1>
                <h2>Discover the Foods What You Loves</h2>

                <div className="search-box">
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="&#128269; Search Here..." />
                    <input type="submit" value="Search" onClick={() => navigate(`/searchFood/${searchedFoods}`)} />

                    {search && <div className="searched-foods">
                        {isLoading && <div className="loader">{showLoader(30, 30, "var(--purple)")}</div>}
                        {!isLoading && searchedFoods && searchedFoods.map((ele) => {
                            return (<li onClick={() => navigate(`/searchFood/${ele.name}`)} key={ele._id}>
                                <img src={ele.img} alt="" />&ensp;
                                <span className="name">{ele.name.length < 50 ? ele.name : ((ele.name).substring(0, 50) + " ...")} <span>({ele.category})</span></span>
                            </li>)
                        })}

                        {searchedFoods.length <= 0 && <img className="not-found" src="https://img.freepik.com/premium-vector/vector-illustration-about-concept-no-items-found-no-results-found_675567-6604.jpg" />}
                    </div>}
                </div>
                <button onClick={() => navigate("/food")}>Order Now</button>
            </div>
        </>
    )
}