import styles from "./orderList.module.css";

export default function UserPurchaseHistory({ closeModal, data }) {

  let itemsCart = [];
  try {
    itemsCart = JSON.parse(data.itemsCart);
  } catch (error) {
    console.error('Error al analizar data.itemsCart como JSON:', error);
  }

  return (
    <div className={styles.modalContainer}>
      <div className={styles.cajita}>
        <section className={styles.boton}>
          <button onClick={closeModal}>X</button>
        </section>
        {itemsCart.map((i, key) => (
          <div key={key}>
            <h1>{i.nameProd}</h1>
            <h3>Id: {i.id}</h3>
            <h3>Category: {i.category}</h3>
            <h3>Stock: {i.stock}</h3>
            <h3>PreceOnSale: {i.priceOnSale?.toFixed(2) ?? "Not Available"}</h3>
            <h3>QuantityProd: {i.quantityProd}</h3>
            <h3>Price: ${i.price?.toFixed(2)}</h3>
            <h3>Total: ${data.totalPrice.toFixed(2)}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}