import "./RenderStars.css";
import { convertRating } from "../../utils/convertRating";

const RenderStars = ({ ratingOutOf10 }) => {

    const ratingOutOf5 = convertRating(ratingOutOf10); // Convert to out of 5
    const fullStars = Math.floor(ratingOutOf5); // Full stars
    const hasHalfStar = ratingOutOf5 % 1 !== 0; // Check for half star

    return (
        <div className="star-rating">
            {/* Full Stars */}
            {Array(fullStars).fill(0).map((_, index) => (
                <span key={index} className="full-star">★</span>
            ))}

            {/* Half Star (if exists) */}
            {hasHalfStar && <span className="half-star">★</span>}

            <span className="rating-number">{ratingOutOf5} / 5</span>
        </div>
    );
};

export default RenderStars;