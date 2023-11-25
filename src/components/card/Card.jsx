import { Link } from "react-router-dom";
import styles from "./card.module.css";

const Card = ({
  productId,
  categoryId,
  nameProd,
  priceOnSale,
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
      <img src={image[0]} alt="producto" className={styles.img}/>
      <h2 className={styles.h2}>{nameProd}</h2>
      <h2 className={styles.text}>{description}</h2>
      <div>
        <p className={styles.price}>${price}</p>
      </div>

      <div>
        <button className={styles.btn}>
          <Link to={`/updateProduct/${productId}`} style={{textDecoration:"none", color:"black"}}>Update</Link>
        </button>
      </div>

    </div>
  );
};
export default Card;
