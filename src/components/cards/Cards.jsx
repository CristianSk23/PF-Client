import Card from "../card/Card";
import styles from "./cards.module.css";

const Cards = ({products}) => {
  
  return (
    <div className={styles.cards}>
      {products?.map(({ id, name, brand, description, price, stock, discountPercentage,priceOnSale, image, active, tags}) => (
        <Card
          key={id}
          productId={id}
          nameProd={name}
          brand={brand}
          priceOnSale={priceOnSale}
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
