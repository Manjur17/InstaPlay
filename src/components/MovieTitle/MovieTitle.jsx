import React, { useState, useRef, useEffect } from "react";
import "./MovieTitle.css";

const MovieTitle = ({ title }) => {
    const [isTruncated, setIsTruncated] = useState(false);
    const titleRef = useRef(null);

    useEffect(() => {

        checkOverflow(); // Initial check

        // Use ResizeObserver to handle dynamic changes in width
        const resizeObserver = new ResizeObserver(checkOverflow);
        if (titleRef.current) {
            resizeObserver.observe(titleRef.current);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, [title]);

    const checkOverflow = () => {
        if (titleRef.current) {
            setIsTruncated(titleRef.current.scrollWidth > titleRef.current.clientWidth);
        }
    };

    return (
        <div className="tooltip">
            <h3 ref={titleRef} className="movie-title">{title}</h3>
            {isTruncated && <span className="tooltip-text">{title}</span>}
        </div>
    );
};

export default MovieTitle;
