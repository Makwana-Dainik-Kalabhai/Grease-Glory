import "./FoodCard.css"

export const FoodCard = ({ ele, setFoodModal, cartItem, addToCart, updateCart, showToast }) => {
    return (
        <div
            className="food-card"
            key={ele._id}
            style={{ opacity: ele.quantity <= 0 && 0.7 }}
        >


            <div className="food-img">
                <img src={ele.img} alt={ele.name} onClick={() => setFoodModal(ele._id)} />
                <div className="add-cart-btn">
                    {(ele.quantity > 0 && cartItem && cartItem.length > 0) ? <>
                        <button className="decrement-btn" onClick={() => updateCart(cartItem._id, cartItem.quantity - 1)}><i className="fa-solid fa-minus"></i></button>

                        <input type="number" value={cartItem.quantity} readOnly />

                        <button className="increment-btn" onClick={() => {
                            if (cartItem.quantity == 10 && ele.quantity > 10) {
                                showToast("You can order maximum 10 quantities", "error");
                            }
                            else if (cartItem.quantity == ele.quantity) {
                                showToast(`Only ${ele.quantity} quantity is available`, "error");
                            }
                            else {
                                updateCart(cartItem._id, cartItem.quantity + 1)
                            }
                        }}><i className="fa-solid fa-plus"></i></button>

                    </> : <button className="add-btn" onClick={() => ele.quantity > 0 && addToCart(ele._id)}>{ele.quantity <= 0 ? "Sold Out" : "ADD"}</button>}
                </div>
            </div>

            <div className="food-details" onClick={() => setFoodModal(ele._id)}>
                <img className="veg-icon" src={ele.veg ? "https://png.pngitem.com/pimgs/s/151-1515150_veg-icon-png-circle-transparent-png.png" : "https://www.pngkey.com/png/full/245-2459071_non-veg-icon-non-veg-symbol-png.png"} alt="" />

                <h2 className="name">{ele.name}</h2>
                <h5 className="category">{ele.category}</h5>
                <div>
                    {ele.price !== ele.offer_price && <><span className="price">₹{ele.price}</span><span>&ensp;</span></>}
                    <span className="offer-price">₹{ele.offer_price}</span>
                    {ele.weight && <span>&ensp;{ele.weight}</span>}
                </div>
                <p className="description">{ele.description}</p>

                <div className="ingredients">
                    {ele.ingredients && ele.ingredients.map((e) => {
                        return <span>{e[0].toUpperCase() + e.substring(1)}</span>
                    })}
                </div>
            </div>
        </div>
    );
}