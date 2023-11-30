import Card from "../card/Card";
import styles from "./cards.module.css";

const Cards = ({ products }) => {
  return (
    <>
      {products.length > 0 ? (
        <div className={styles.cards}>
          {products.map(({ id, nameProd, brand, description, price, stock, discountPercentage, priceOnSale, image, active, tags }) => (
            <Card
              key={id}
              productId={id}
              nameProd={nameProd}
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
      ) : (
        <p className={styles.cards}>There are no products with those characteristics.</p>
      )}
    </>
  );
};

export default Cards;
