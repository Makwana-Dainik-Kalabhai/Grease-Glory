import "./FoodModal.css";

export const FoodModal = ({ productId, foods, setFoodModal }) => {
    const filterFood = foods.filter(item => item._id === productId);

    return !!filterFood && filterFood.map((ele) => {
        return <div className="food-modal-container" key={ele._id} onClick={() => setFoodModal("")}>
            <div className="food-modal">
                <img src={ele.img} alt="" />
                <div className="food-details">
                    <h2 className="name">{ele.name}<span>{ele.veg ? "Veg" : "Non-Veg"}</span></h2>
                    <h5 className="category">{ele.category}</h5>
                    <div>
                        {ele.price !== ele.offer_price && <><span className="price">₹{ele.price}</span><span>&ensp;</span></>}
                        <span className="offer-price">₹{ele.offer_price}</span>
                        {ele.weight && <span>&ensp;{ele.weight}</span>}
                    </div>
                    <p>{ele.description}</p>

                    <div className="ingredients">
                        {ele.ingredients && ele.ingredients.map((e) => {
                            return <span>{e[0].toUpperCase() + e.substring(1)}</span>
                        })}
                    </div>
                </div>
            </div>
        </div>
    })
}