import React from "react";
import styles from "./orderDetailUserByIdPopup.module.css";
import { CloseButton } from "react-bootstrap";

const OrderDetailUserByIdPopup = ({ orderDetails, onClose }) => {
  return (
    <div>
      <div className={styles.overlay}></div>
      <div className={styles.popup}>
      <CloseButton onClick={onClose} className={styles.closeButton}/>
        <table className="table table-hover" style={{marginTop:"10px"}}>
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
                    <td className={styles.td}>${parseFloat(product?.price).toFixed(2)}</td>
                    <td className={styles.td}>${parseFloat(product?.priceOnSale).toFixed(2)}</td>
                    <td className={styles.td}>{product?.stock}</td>
                    <td className={styles.td}>{product?.quantityProd}</td>
                    <td className={styles.td}>{product?.category}</td>
                    </tr>
                ))}
         </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetailUserByIdPopup;