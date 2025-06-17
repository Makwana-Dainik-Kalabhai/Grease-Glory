import "./PageNotFound.css";
import { useNavigate } from "react-router-dom";

export const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="pagenotfound-container">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>Page you are looking for was moved removed, renamed or might never existed.</p>
            <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
    );
}