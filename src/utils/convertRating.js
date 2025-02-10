export function convertRating(ratingOutOf10) {
    let ratingOutOf5 = ratingOutOf10 / 2;

    // Round to the nearest 0.5
    return Math.round(ratingOutOf5 * 2) / 2;
}