import styles from "./starRating.module.css"

const StarRating = ({ selectedStars, onSelectStar, isSelect }) => {
    const totalStars = 5;
  
    return (
      <div>
        {Array.from({ length: totalStars }).map((_, index) => (
          <span
            key={index}
            className={
              index < selectedStars ? styles.selectedStar : styles.unselectedStar
            }
            onClick={isSelect ? () => onSelectStar(index + 1) : null}
          >
            &#9733;
          </span>
        ))}
      </div>
    );
  };

  export default StarRating;