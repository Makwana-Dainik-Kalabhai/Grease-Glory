import "./Footer.css";
import logo from "../../logo.png";

const Footer = () => {
    return (
        <>
            <footer>
                <div className="footer-1">
                    <img src={logo} alt="" />
                    <div className="company-description">
                        <h1>Grease & Glory</h1>
                        <h2>Discover the Foods What You Loves</h2>
                    </div>
                </div>

                <div className="footer-2">
                    <div>
                        <h4>Company</h4>
                        <a href="/">About US</a>
                        <a href="/">Contact US</a>
                        <a href="/">Careers</a>
                    </div>
                    <div>
                        <h4>Information</h4>
                        <a href="/">Help / FAQs</a>
                        <a href="/">Parteners</a>
                    </div>
                    <div>
                        <h4>Policies</h4>
                        <a href="/">Terms & Conditions</a>
                        <a href="/">Order Cancelletion</a>
                        <a href="/">Delivery & Payment</a>
                    </div>
                    <div>
                        <h4>More</h4>
                        <a href="/">Home</a>
                        <a href="/">Foods Gallery</a>
                        <a href="/">Orders</a>
                        <a href="/">Shop Now</a>
                    </div>
                    <div className="contact-info">
                        <h4>Contact</h4>
                        <p>A/203 Sarju Arena near Kadi Nagrik Bank Sneh Plaza road, Chandkheda, Gandhinagar, Gujarat - 382424</p>
                    </div>
                </div>

                <div className="footer-3">
                    <p>&copy;2025 - Grease & Glory. All rights are reserved by Grease & Glory.</p>
                    <div>
                        <a href="/"><i className="fa-brands fa-facebook-f"></i></a>
                        <a href="/"><i className="fa-brands fa-twitter"></i></a>
                        <a href="/"><i className="fa-brands fa-linkedin-in"></i></a>
                        <a href="/"><i className="fa-brands fa-instagram"></i></a>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;