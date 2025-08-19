import "./Hero.css";
import dish from "./dish.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../ContextApi/Store";
import { motion } from "framer-motion";

export const Hero = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [searchedFoods, setSearchedFoods] = useState([]);
    const { isLoading, setIsLoading, showLoader } = useStore();

    const handleSearch = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}foods/search`, {
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
        if (search) {
            const timeOut = setTimeout(() => {
                handleSearch();
            }, 100);

            return clearTimeout(timeOut);
        }
    }, [search]);



    return (
        <>
            <div className="wave">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#662249" fillOpacity="1" d="M0,192L40,208C80,224,160,256,240,272C320,288,400,288,480,277.3C560,267,640,245,720,202.7C800,160,880,96,960,80C1040,64,1120,96,1200,101.3C1280,107,1360,85,1400,74.7L1440,64L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path></svg>
                <div className="circle"></div>
                <motion.img src={dish} alt="Img not found"
                    initial={{ opacity: 0.2, x: -100, y: 200 }}
                    transition={{
                        duration: 0.8,
                    }
                    }
                    whileInView={{ opacity: 1, x: 0, y: 0 }} />
            </div>
            <div className="hero-container">
                <motion.h1
                    initial={{ opacity: 0.2, x: 100, y: 200 }}
                    transition={{
                        duration: 0.8,
                    }
                    }
                    whileInView={{ opacity: 1, x: 0, y: 0 }}>Grease & Glory</motion.h1>
                <motion.h2
                    initial={{ opacity: 0.2, x: 100, y: 200 }}
                    transition={{
                        duration: 0.8,
                    }
                    }
                    whileInView={{ opacity: 1, x: 0, y: 0 }}>Discover the Foods What You Loves</motion.h2>

                <motion.div className="search-box"
                    initial={{ opacity: 0.2, x: 100, y: 200 }}
                    transition={{
                        duration: 0.8,
                    }
                    }
                    whileInView={{ opacity: 1, x: 0, y: 0 }}>
                    <form onSubmit={(e) => { e.preventDefault(); navigate(`/searchFood/${search}`); }}>
                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="&#128269; Search Here..." />
                        <input type="submit" value="Search" onClick={() => navigate(`/searchFood/${search}`)} />
                    </form>

                    {search && <div className="searched-foods">
                        {isLoading && <div className="loader">{showLoader(30, 30, "var(--purple)")}</div>}
                        {!isLoading && searchedFoods && searchedFoods.map((ele) => {
                            return (<li onClick={() => navigate(`/searchFood/${ele.name}`)} key={ele._id}>
                                <img src={ele.img} alt="" />&ensp;
                                <span className="name">{ele.name.length < 50 ? ele.name : ((ele.name).substring(0, 50) + " ...")} <span>({ele.category})</span></span>
                            </li>)
                        })}

                        {searchedFoods.length <= 0 && <img className="not-found" src="https://img.freepik.com/premium-vector/vector-illustration-about-concept-no-items-found-no-results-found_675567-6604.jpg" alt="" />}
                    </div>}
                </motion.div>
                <motion.button onClick={() => navigate("/food")} initial={{ opacity: 0.2, x: 100, y: 200 }}
                    transition={{
                        duration: 0.8,
                    }
                    }
                    whileInView={{ opacity: 1, x: 0, y: 0 }}>Order Now</motion.button>
            </div>
        </>
    )
}