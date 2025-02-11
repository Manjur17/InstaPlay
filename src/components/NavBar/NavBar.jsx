import React, { useState } from "react";
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

    return (
        <nav className="nav-container">
            <img className="logo" src={logo} alt="InstaPlay" onClick={() => navigate("/")} />

            {displaySearchBar && (
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
            )}

            {displaySearchBar && <button className="logout-btn"
                onClick={() => {
                    logout();
                    toast.success("Logout successful!", { autoClose: 2000 });
                    setSerachText("");
                    navigate("/");
                }}
            >Logout</button>
            }
        </nav>
    );
};

export default NavBar;
