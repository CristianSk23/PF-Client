import React from 'react';

const StarRating = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= filledStars) {
        // Estrella llena
        stars.push(<span key={i} className="star">&#9733;</span>);
      } else if (i === filledStars + 1 && halfStar) {
        // Media estrella
        stars.push(<span key={i} className="star">&#9733;&#9734;</span>);
      } else {
        // Estrella vacía
        stars.push(<span key={i} className="star">&#9734;</span>);
      }
    }
    return stars;
  };

  return <div className="star-rating">{renderStars()}</div>;
};

export default StarRating;
