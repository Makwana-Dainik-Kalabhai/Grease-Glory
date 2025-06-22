import "./Contact.css";
import { useEffect, useState } from "react";
import { useStore } from "../../ContextApi/Store";

export const Contact = () => {

    const { userData, isLoading, setIsLoading, showLoader, showToast } = useStore();
    const { username, email, phone } = userData;

    const [contactData, setContactData] = useState({
        username: username,
        email: email,
        phone: phone,
        message: ""
    });

    useEffect(() => {
        setContactData({
            username: username,
            email: email,
            phone: phone,
            message: ""
        });
    }, [username, email, phone]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setContactData(prev => ({ ...prev, [name]: value }));
    }

    const handleForm = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const req = await fetch("http://localhost:3001/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(contactData)
            });
            const res = await req.json();

            if (req.ok) {
                setContactData({
                    username: username,
                    email: email,
                    phone: phone,
                    message: ""
                });
                showToast(res.message, "success");
            }
            else {
                showToast(res.message, "error");
            }
            //
        }
        catch (err) {
            showToast(err.message, "error");
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="container">
            <div className="fake-header"></div>
            <section>
                <div className="decoration-box left-top"></div>
                <div className="decoration-box left-bottom"></div>
                <div className="decoration-box right-bottom"></div>

                <div className="contact-container">
                    <div className="contact-left">
                        <div className="location">
                            <i className="fa-solid fa-location-dot"></i>
                            <div>
                                <h2>Location</h2>
                                <span>A/203 Sarju Arena near Kadi Nagrik Bank Sneh Plaza road, Chandkheda, Gandhinagar, Gujarat.</span>
                            </div>
                        </div>
                        <div className="phone">
                            <i className="fa-solid fa-phone"></i>
                            <div>
                                <h2>Phone</h2>
                                <span>+91 98989 89898</span>
                            </div>
                        </div>
                        <div className="social-media">
                            <i className="fa-brands fa-facebook-f"></i>
                            <i className="fa-brands fa-twitter"></i>
                            <i className="fa-brands fa-instagram"></i>
                        </div>
                    </div>

                    <div className="contact-center">
                        <img src="https://media.istockphoto.com/id/1045894084/photo/4th-of-july-picnic.jpg?s=612x612&w=0&k=20&c=J23SK7jbiW7z8OusYEmtr9l4Ns-99h_dv1kt5fxF7Ek=" alt="" />
                    </div>

                    <div className="contact-right">
                        <form onSubmit={handleForm}>
                            <h1><span>Contact</span> <sub>now</sub></h1>
                            <div className="form-group">
                                <input type="text" name="username" placeholder="UserName" value={contactData.username || ""} onChange={handleInput} />
                                <i className="fa-solid fa-user"></i>
                            </div>
                            <div className="form-group">
                                <input type="email" name="email" placeholder="Email ID" value={contactData.email || ""} onChange={handleInput} />
                                <i className="fa-solid fa-envelope"></i>
                            </div>
                            <div className="form-group">
                                <input type="number" name="phone" placeholder="Phone Number" value={contactData.phone || ""} onChange={handleInput} />
                                <i className="fa-solid fa-phone"></i>
                            </div>
                            <div className="form-group">
                                <textarea name="message" placeholder="Message" rows="3" value={contactData.message || ""} onChange={handleInput}>{contactData.message}</textarea>
                                <i className="fa-solid fa-message"></i>
                            </div>
                            <button type="submit">{isLoading ? showLoader(20, 20, "white") : "Send"}</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}