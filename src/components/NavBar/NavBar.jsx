import React from "react";
import "./NavBar.css";
import logo from "../../assets/websiteLogo.svg";
import searchIcon from "../../assets/Group47.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useSearch } from "../../context/SearchContext";
import { toast } from "react-toastify";

const NavBar = ({ displaySearchBar }) => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { query, setSerachText } = useSearch();

    const handleNavigate = () => {
        sessionStorage.removeItem("lastPage");
        navigate("/");
    };

    return (
        <nav className="nav-container">
            <img className="logo" src={logo} alt="InstaPlay" onClick={handleNavigate} />

            {displaySearchBar && (
                <div className="search-wrapper">
                    <div className="search-container">
                        <input
                            className="input-search"
                            type="text"
                            placeholder="Search movies"
                            value={query}
                            onChange={(e) => setSerachText(e.target.value)}
                        />
                        <img className="search-btn" src={searchIcon} alt="Search" />
                    </div>

                    <button className="logout-btn"
                        onClick={() => {
                            logout();
                            toast.success("Logout successful!", { autoClose: 2000 });
                            setSerachText("");
                            navigate("/");
                        }}
                    >Logout</button>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
