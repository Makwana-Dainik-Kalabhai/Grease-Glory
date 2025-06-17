import "./RecipeDetails.css";
import { useEffect, useState } from "react";
import { data, useParams } from "react-router-dom";
import { useStore } from "../../../ContextApi/Store";

export const RecipeDetails = () => {

    const { id } = useParams();
    const [recipeDetails, setRecipeDetails] = useState("");

    const { isLoading, setIsLoading, showLoader } = useStore();

    const fetchDetails = async () => {
        setIsLoading(true);

        try {
            const api = await fetch(`https://chinese-food-db.p.rapidapi.com/${id}?rapidapi-key=c2a4fea7e5msh29b80547a137bf0p17e936jsn800bed27fc1e`);
            const data = await api.json();

            if (api.ok) {
                setRecipeDetails(data);
                setIsLoading(false);
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchDetails();
    }, []);

    return (
        <>
            <div className="fake-header"></div>
            {isLoading && showLoader(70, 70, "#e88630")}

            {recipeDetails && <section className="recipe-details-container">
                <div className="decoration-box left-top"></div>
                <div className="decoration-box left-bottom"></div>
                <div className="decoration-box right-bottom"></div>

                <div className="recipe-hero">
                    <div className="food-img">
                        <img src={recipeDetails.image} alt="" />
                        <h5 className="badge">{recipeDetails.difficulty}</h5>
                    </div>
                    <div className="food-details">
                        <h2 className="title">{recipeDetails.title}</h2>
                        <h5 className="time">{recipeDetails.time}</h5>
                        <p className="description">{recipeDetails.description}</p>

                        <div className="ingredients">
                            <h5>Ingredients:</h5>
                            <table>
                                <tbody>
                                    {recipeDetails.ingredients.map((ele, i) => {
                                        return <tr key={i}>
                                            <th>{i + 1}</th>
                                            <td>{ele}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="recipe-process">
                    <h1>Step by step <span>Process</span></h1>

                    {recipeDetails.method.map((ele, i) => {
                        return <details key={i}>
                            <summary>Step - {i + 1}</summary>
                            <p>{ele[`Step ${i + 1}`]}</p>
                        </details>
                    })}
                </div>
            </section>}
        </>
    );
}