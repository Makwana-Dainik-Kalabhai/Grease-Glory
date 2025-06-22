import "./Recipe.css";
import { Recipes } from "./recipes";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../ContextApi/Store";

export const Recipe = () => {

    const navigate = useNavigate();

    const [recipes, setRecipes] = useState(Recipes);
    const [pageSize, setPageSize] = useState(7);

    const { isLoading, setIsLoading, showLoader, showToast } = useStore();

    const fetchRecipes = async () => {
        setIsLoading(true);

        try {
            const api = await fetch("https://chinese-food-db.p.rapidapi.com?rapidapi-key=c2a4fea7e5msh29b80547a137bf0p17e936jsn800bed27fc1e");
            const data = await api.json();

            if (api.ok) {
                setRecipes(data);
                setIsLoading(false);
            }
            else {
                showToast(data.message, "error");
            }
        }
        catch (err) {
            showToast(err.message, "error");
        }
    }

    const loadMoreData = (section) => {
        setIsLoading(true);

        if ((section.scrollHeight - section.scrollTop - section.clientHeight) < 60) {
            setPageSize((prev) => (prev + 8));
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (fetchRecipes()) {

            if (pageSize <= recipes.length || recipes.length == 0) {
                document.getElementById("recipes").addEventListener("scroll", () => loadMoreData(document.getElementById("recipes")));
            }
        }
    }, []);

    return (
        <>
            <div className="fake-header"></div>
            <section className="recipe-container" id="recipes">
                {recipes.length !== 0 && <>
                    <div className="decoration-box left-top"></div>
                    <div className="decoration-box left-bottom"></div>
                    <div className="decoration-box right-bottom"></div> </>
                }

                {recipes.length !== 0 && <>
                    <h1>Cook with <span>Us</span></h1>
                    <div className="recipe-grid">
                        {recipes.map((ele, i) => {
                            return i <= pageSize && <div className="recipe-card" key={ele.id} onClick={() => navigate(`/recipe/recipe-details/${ele.id}`)}>
                                <img src={ele.image} alt={ele.title} />
                                <h5>{ele.title}</h5>
                                <span className="badge">{ele.difficulty}</span>
                            </div>
                        })}
                    </div>
                </>}
                {isLoading && showLoader(70, 70, "#e88630")}
            </section>
        </>
    );
}