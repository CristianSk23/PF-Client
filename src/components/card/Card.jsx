import styles from "./card.module.css";

const Card = ({
  productId,
  categoryId,
  nameProd,
  brand,
  description,
  price,
  discountPercentage,
  image,
  active,
  tags,
  stock,
}) => {
  return (
    <div className={styles.card}>
      <img src={image} alt="" />
      <h2>{nameProd}</h2>
      <h2>{description}</h2>
      <h2>{price}</h2>
      <button>Buy</button>
    </div>
  );
};
export default Card;
