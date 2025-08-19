import "./Home.css";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import about from "./about.jpg";
import { GALLERY } from "./Gallery";
import { Hero } from "../../components/Hero/Hero";
import { useStore } from "../../ContextApi/Store";
import { motion } from "framer-motion";

const Home = () => {
    const { showToast } = useStore();
    const [foods, setFoods] = useState([]);
    const [categories, setCategories] = useState("");

    //! Fetch All Foods
    const fetchCategories = async () => {
        try {
            const api = await fetch(`${process.env.REACT_APP_BACKEND_URL}foods`);
            const data = await api.json();

            if (!!data) {
                setFoods(data);
                setCategories([...new Map(data.map(item => [item.category, item])).values()]);
            }
            else
                showToast(data.message, "error");
        }
        catch (err) {
            showToast(err.message, "error");
        }
    }

    useEffect(() => {
        fetchCategories();
    });



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
                        <motion.div initial={{ opacity: 0.2, x: -100, y: 50 }}
                            transition={{
                                duration: 0.8,
                            }
                            }
                            whileInView={{ opacity: 1, x: 0, y: 0 }}>
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
                        </motion.div>
                        <motion.div initial={{ opacity: 0.2, x: 100, y: 50 }}
                            transition={{
                                duration: 0.8,
                            }
                            } s
                            whileInView={{ opacity: 1, x: 0, y: 0 }}>
                            <img src={about} alt="Img not Found" />
                        </motion.div>
                    </div>
                </section>

                <section>
                    <div className="decoration-box left-top"></div>
                    <div className="decoration-box left-bottom"></div>
                    <div className="decoration-box right-bottom"></div>

                    <h1>Choose by <span>Category</span></h1>
                    <motion.div className="choose-category" initial={{ opacity: 0.2, y: 200 }}
                        transition={{
                            duration: 0.8,
                        }
                        }
                        whileInView={{ opacity: 1, y: 0 }}>
                        {
                            categories && categories.map((e, i) => {
                                return (
                                    i < 12 && <NavLink to={`/food/${e.category}`} key={i}>
                                        <img src={e.img} alt="Img not Found" />
                                        <span>{e.category}</span>
                                    </NavLink>
                                );
                            })
                        }
                    </motion.div>
                </section>


                {/* Orders Now */}
                <section>
                    <div className="decoration-box left-top"></div>
                    <div className="decoration-box left-bottom"></div>
                    <div className="decoration-box right-bottom"></div>

                    <h1>Order <span>Now</span></h1>
                    <motion.div className="order-now" initial={{ opacity: 0.2, y: 200 }}
                        transition={{
                            duration: 0.8,
                        }
                        }
                        whileInView={{ opacity: 1, y: 0 }}>
                        {
                            foods && foods.map((e, i) => (
                                i < 15 && <a href="/" key={i}>
                                    <img src={e.img} alt="Img not Found" />
                                    <div className="product-details">
                                        <span className="name">{(e.name.length < 40) ? e.name : e.name.substr(0, 40) + "..."}</span>
                                        <span className="offer-price">₹{e.offer_price}&nbsp;
                                            <span className="price">₹{e.price}</span>
                                        </span>

                                        <button><i className="fa-solid fa-cart-plus"></i>&ensp;Add to Cart</button>
                                    </div>
                                </a>
                            ))
                        }
                    </motion.div>
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
                                        (i < 3) ? <motion.img key={i} src={e} alt="Img not Found" initial={{ opacity: 0.2, x: -100, y: 50 }}
                                            transition={{
                                                duration: 0.8,
                                            }
                                            }
                                            whileInView={{ opacity: 1, x: 0, y: 0 }} /> : ""
                                    );
                                })
                            }
                        </div>
                        <div className="col-2">
                            {
                                GALLERY.map((e, i) => {
                                    return (
                                        (i >= 3) ? <motion.img key={i} src={e} alt="Img not Found" initial={{ opacity: 0.2, x: 100, y: 200 }}
                                            transition={{
                                                duration: 0.8,
                                            }
                                            }
                                            whileInView={{ opacity: 1, x: 0, y: 0 }} /> : ""
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
                        <motion.input initial={{ opacity: 0.2, x: -100 }} transition={{ duration: 0.8 }} whileInView={{ opacity: 1, x: 0 }} type="text" placeholder="User Name" />

                        <motion.input initial={{ opacity: 0.2, x: 100 }} transition={{ duration: 0.8 }} whileInView={{ opacity: 1, x: 0 }} type="email" placeholder="Email ID" />

                        <motion.input initial={{ opacity: 0.2, x: -100 }} transition={{ duration: 0.8 }} whileInView={{ opacity: 1, x: 0 }} type="number" placeholder="Phone no." />

                        <motion.textarea initial={{ opacity: 0.2, x: 100 }} transition={{ duration: 0.8 }} whileInView={{ opacity: 1, x: 0 }} placeholder="Enter Your Message Here..." rows="4"></motion.textarea>

                        <button>Send</button>
                    </form>
                </section>
            </div>
        </>
    );
}

export default Home;