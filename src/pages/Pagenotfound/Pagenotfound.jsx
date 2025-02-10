import { useNavigate } from "react-router-dom";


import "./PagenotFound.css";

const Pagenotfound = () => {
    const navigate = useNavigate();

    return (
        <div className="page-not-found-container">
            <div className="error-card">
                <h2>Page not found</h2>
                <p>
                    Looks like you’ve followed a broken link or entered a URL that doesn’t exist on this site.
                </p>
                <hr />
                <h3
                    onClick={() => {
                        navigate("/");
                    }}
                    className="redirect"
                >
                    {" "}
                    Go to Home
                </h3>
            </div>
        </div>
    );
};

export default Pagenotfound;