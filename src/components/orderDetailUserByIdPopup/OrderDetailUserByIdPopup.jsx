import React from "react";
import styles from "./orderDetailUserByIdPopup.module.css";

const OrderDetailUserByIdPopup = ({ orderDetails, onClose }) => {
  return (
    <div>
      <div className={styles.overlay}></div>
      <div className={styles.popup}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th className={styles.th} scope="col">Id product</th>
              <th className={styles.th} scope="col">Name product</th>
              <th className={styles.th} scope="col">Price product</th>
              <th className={styles.th} scope="col">Price on sale</th>
              <th className={styles.th} scope="col">Stock</th>
              <th className={styles.th} scope="col">Quantity</th>
              <th className={styles.th} scope="col">Category</th>
            </tr>
          </thead>
          <tbody>
                {Array.isArray(orderDetails) && orderDetails.map((product) => (
                    <tr key={product.id}>
                    <td className={styles.td}>{product?.id}</td>
                    <td className={styles.td}>{product?.nameProd}</td>
                    <td className={styles.td}>{product?.price}</td>
                    <td className={styles.td}>{product?.priceOnSale}</td>
                    <td className={styles.td}>{product?.stock}</td>
                    <td className={styles.td}>{product?.quantityProd}</td>
                    <td className={styles.td}>{product?.category}</td>
                    </tr>
                ))}
         </tbody>
        </table>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default OrderDetailUserByIdPopup;