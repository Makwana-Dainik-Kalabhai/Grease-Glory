import "./Home.css";
import { NavLink } from "react-router-dom";
import about from "./about.jpg";
import { FOODS } from "./Foods";
import { GALLERY } from "./Gallery";
import { Hero } from "../Hero/Hero";

const Home = () => {
    return (
        <>
            <header>
                <Hero />
            </header>
            <div className="container">
                <section>
                    <div className="decoration-box left-top"></div>
                    <div className="decoration-box left-bottom"></div>
                    <div className="decoration-box right-bottom"></div>

                    <h1>About <span>Us</span></h1>
                    <div className="about-us">
                        <div>
                            <h2>Grease & Glory</h2>
                            <p>
                                <b>Grease & Glory</b> is a dynamic and bold food ordering system designed for the modern food enthusiast who craves indulgence without compromise. Specializing in comfort food with a gourmet twist, <b>Grease & Glory</b> brings together the best of both worlds: the rich, savory flavors of classic greasy spoon diners and the elevated, Instagram-worthy presentation of contemporary cuisine.
                            </p>
                            <p>
                                Whether you're in the mood for loaded burgers, crispy fried chicken, gooey mac 'n' cheese, or decadent milkshakes, <b>Grease & Glory</b> delivers a seamless and satisfying ordering experience. The platform is built for speed and convenience, allowing users to customize their meals, track orders in real-time, and enjoy doorstep delivery or quick pickup.
                            </p>
                            <p>
                                With a name that celebrates the unapologetic joy of indulgent eating, <b>Grease & Glory</b> is more than just a food ordering system—it's a celebration of flavor, fun, and the glorious satisfaction of a meal done right. Perfect for late-night cravings, weekend feasts, or anytime you want to treat yourself, <b>Grease & Glory</b> is your go-to for food that’s bold, delicious, and unforgettable.
                            </p>
                            <button><NavLink to="/about" style={{ color: "white", textDecoration: "none" }}>Read More</NavLink></button>
                        </div>
                        <div>
                            <img src={about} alt="Img not Found" />
                        </div>
                    </div>
                </section>

                <section>
                    <div className="decoration-box left-top"></div>
                    <div className="decoration-box left-bottom"></div>
                    <div className="decoration-box right-bottom"></div>

                    <h1>Choose by <span>Category</span></h1>
                    <div className="choose-category">
                        {
                            FOODS.map((e, i) => {
                                return (
                                    <a href="/" key={i}>
                                        <img src={e.link} alt="Img not Found" />
                                        <span>{e.name}</span>
                                    </a>
                                );
                            })
                        }
                    </div>
                </section>


                {/* Orders Now */}
                <section>
                    <div className="decoration-box left-top"></div>
                    <div className="decoration-box left-bottom"></div>
                    <div className="decoration-box right-bottom"></div>

                    <h1>Order <span>Now</span></h1>
                    <div className="order-now">
                        {
                            FOODS.map((e, i) => {
                                return (
                                    <a href="/" key={i}>
                                        <img src={e.link} alt="Img not Found" />
                                        <div className="product-details">
                                            <span>{e.name}</span>
                                            <span>₹{e.price}</span>

                                            <div className="btns">
                                                <button>Add to Cart</button>
                                                <button><i className="fa-solid fa-heart"></i></button>
                                            </div>
                                        </div>
                                    </a>
                                );
                            })
                        }
                    </div>
                </section>


                {/* Foods Gallery */}
                <section>
                    <div className="decoration-box left-top"></div>
                    <div className="decoration-box left-bottom"></div>
                    <div className="decoration-box right-bottom"></div>

                    <h1>Our Foods <span>Gallery</span></h1>
                    <div className="foods-gallery">
                        <div className="col-1">
                            {
                                GALLERY.map((e, i) => {
                                    return (
                                        (i < 3) ? <img key={i} src={e} alt="Img not Found" /> : ""
                                    );
                                })
                            }
                        </div>
                        <div className="col-2">
                            {
                                GALLERY.map((e, i) => {
                                    return (
                                        (i >= 3) ? <img key={i} src={e} alt="Img not Found" /> : ""
                                    );
                                })
                            }
                        </div>
                    </div>
                </section>


                {/* Contact US */}
                <section>
                    <div className="decoration-box left-top"></div>
                    <div className="decoration-box left-bottom"></div>
                    <div className="decoration-box right-bottom"></div>

                    <h1>Get In <span>Touch</span></h1>
                    <form action="" className="contact-us">
                        <input type="text" placeholder="User Name" />
                        <input type="email" placeholder="Email ID" />
                        <input type="number" placeholder="Phone no." />
                        <textarea placeholder="Enter Your Message Here..." rows="4"></textarea>

                        <button>Send</button>
                    </form>
                </section>
            </div>
        </>
    );
}

export default Home;