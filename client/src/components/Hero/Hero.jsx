import "./Hero.css";
import dish from "./dish.png";

export const Hero = () => {
    return (
        <>
            <div className="wave">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#662249" fill-opacity="1" d="M0,192L40,208C80,224,160,256,240,272C320,288,400,288,480,277.3C560,267,640,245,720,202.7C800,160,880,96,960,80C1040,64,1120,96,1200,101.3C1280,107,1360,85,1400,74.7L1440,64L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path></svg>
                <div className="circle"></div>
                <img src={dish} alt="Img not found" />
            </div>
            <div className="hero-container">
                <h1>Grease & Glory</h1>
                <h2>Discover the Foods What You Loves</h2>

                <form action="" className="search-input">
                    <input type="text" placeholder="&#128269; Search Here..." />
                    <input type="submit" value="Search" />
                </form>
                <button>Order Now</button>
            </div>
        </>
    )
}