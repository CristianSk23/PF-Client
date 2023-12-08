import styles from "./orderList.module.css";

export default function UserPurchaseHistory({ closeModal, data }) {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.cajita}>
        <section className={styles.boton}>
          <button onClick={closeModal}>X</button>
        </section>
        {data?.map((i, key) => (
          <div key={key}>
            <h1>{i.nameProd}</h1>
            <h3>Id: {i.id}</h3>
            <h3>Category: {i.category}</h3>
            <h3>Stock: {i.stock}</h3>
            <h3>PreceOnSale: ${i.priceOnSale ?? "Not Available"}</h3>
            <h3>QuantityProd: {i.quantityProd}</h3>
            <h3>Price: ${i.price?.toFixed(2)}</h3>
            <h3>Total: ${parseInt(i.price)*parseInt(i.quantityProd)}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
