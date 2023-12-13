import styles from "./orderList.module.css";
import { CloseButton } from "react-bootstrap";

export default function UserPurchaseHistory({ closeModal, data }) {

  let itemsCart = [];
  try {
    itemsCart = JSON.parse(data.itemsCart);
  } catch (error) {
    console.error('Error al analizar data.itemsCart como JSON:', error);
  }

  return (
    <div>
    <div className={styles.overlay}></div>
      <div className={styles.popup}>
      <CloseButton onClick={closeModal} className={styles.closeButton}/>
      <table className="table table-hover" style={{marginTop:"10px"}}>
        <thead>
          <tr>
            <th className={styles.th} scope="col">Id</th>
            <th className={styles.th} scope="col">Name</th>
            <th className={styles.th} scope="col">Category</th>
            <th className={styles.th} scope="col">Price</th>
            <th className={styles.th} scope="col">Price On Sale</th>
            <th className={styles.th} scope="col">Stock</th>
            <th className={styles.th} scope="col">Quantity Prod</th>
          </tr>
        </thead>
        <tbody>
              {itemsCart.map((i, key) => (
                  <tr key={key}>
                  <td className={styles.td}>{i.id}</td>
                  <td className={styles.td}>{i.nameProd}</td>
                  <td className={styles.td}>{i.category}</td>
                  <td className={styles.td}>${Number(i.price)?.toFixed(2)}</td>
                  <td className={styles.td}>{Number(i.priceOnSale) > 0 ? Number(i.priceOnSale).toFixed(2) : Number(i.price).toFixed(2)}</td>
                  <td className={styles.td}>{i.stock}</td>
                  <td className={styles.td}>{i.quantityProd}</td>
                  </tr>
              ))}
                  <tr>
                    <td align="center" colSpan="7" style={{fontSize:"20px"}}><strong>Total Price: ${data.totalPrice.toFixed(2)}</strong></td>
                  </tr>
          </tbody>
      </table>
  </div>
</div>
  );
}
