import React, { useState, useRef, useEffect } from "react";
import "./MovieTitle.css";

const MovieTitle = ({ title }) => {
    
    const [isTruncated, setIsTruncated] = useState(false);
    const titleRef = useRef(null);

    useEffect(() => {
        if (titleRef.current) {
            setIsTruncated(titleRef.current.scrollWidth > titleRef.current.clientWidth);
        }
    }, [title]);

    return (
        <div className="tooltip">
            <h3 ref={titleRef} className="movie-title">{title}</h3>
            {isTruncated && <span className="tooltip-text">{title}</span>}
        </div>
    );
};

export default MovieTitle;
