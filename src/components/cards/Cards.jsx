import Card from "../card/Card";
import styles from "./cards.module.css";

const Cards = ({products}) => {
  
  return (
    <div className={styles.cardContainer}>
      {products.map(({ productId, categoryId, nameProd, brand, description, price, discountPercentage, image, active, tags, stock }) => (
        <Card
          key={productId}
          productId={productId}
          categoryId={categoryId}
          nameProd={nameProd}
          brand={brand}
          description={description}
          price={price}
          discountPercentage={discountPercentage}
          image={image}
          active={active}
          tags={tags}
          stock={stock}
        />
      ))}
    </div>
  );
  
};
export default Cards;
