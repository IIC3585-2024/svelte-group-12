// @ts-nocheck
export function calculateRatingFromReviews(reviews) {
  const totalReviews = reviews.length;
  const totalRating = reviews.reduce((acc, review) => acc + +review.value, 0);
  return (totalRating / totalReviews).toFixed(1);
}

export function ratingCategory(rating) {
  if (rating < 2) {
    return 'No recomendado';
  } else if (rating < 3) {
    return 'Suficiente';
  } else if (rating < 4) {
    return 'Bueno';
  } else if (rating < 4.5) {
    return 'Muy bueno';
  } else {
    return 'Excelente';
  }
}