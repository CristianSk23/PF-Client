import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allOrders, filterOrderPurchase, updateOrderStatus } from "../../redux/action/actions";
import UserPurchaseHistory from "./userPurchaseHistory";
import styles from "./orderList.module.css";

export default function OrderList() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orderHistory);

  useEffect(() => {
    dispatch(allOrders());
  }, [dispatch]);

  const [visibleModal, setvisibleModal] = useState(false);
  const [actualData, setactualData] = useState({});
  const [name, setname] = useState("");

  const handleChange = (e) => {
    setname(e.target.value);
  };

  const search = (e) => {
    e.preventDefault();
    if (name.length >= 2) {
      dispatch(filterOrderPurchase(name));
    } else {
      dispatch(allOrders());
    }
  };

  const openModal = (e) => {
    e.preventDefault();
    if (!visibleModal) {
      const data = orders.find((i) => i.id == e.target.value);
      if (data) {
        const { itemsCart, totalPrice } = data;
        setactualData({ itemsCart, totalPrice });
      }
    }
    setvisibleModal(!visibleModal);
    console.log('SETACUALDATA',actualData)
  };


  const updateDeliveryStatus = (orderId, newStatus) => {
    dispatch(updateOrderStatus(orderId, newStatus));
  };

  return (
    <div>
      {visibleModal && (
        <UserPurchaseHistory closeModal={openModal} data={actualData} />
      )}
      <h5>Orders list:</h5>
      <input type="text" onChange={handleChange} value={name} />
      <button onClick={search}>Search</button>
      <table className="table table-hover">
        <thead>
          <tr>
            <th className={styles.th} scope="col">
              ID Order
            </th>
            <th className={styles.th} scope="col">
              Order Date
            </th>
            <th className={styles.th} scope="col">
              Name
            </th>
            <th className={styles.th} scope="col">
              Mercado Pago Status
            </th>
            <th className={styles.th} scope="col">
              Delivery Status
            </th>
            <th className={styles.th} scope="col">
              Total Amount
            </th>
            <th className={styles.th} scope="col">
              Order
            </th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order) => (
              <tr key={order.id}>
                <td className={styles.td}>{order.id}</td>
                <td className={styles.td}>{order.orderDate}</td>
                <td className={styles.td}>{order.userName}</td>
                <td className={styles.td}>{order.mercadopagoTransactionStatus}</td>
                <td className={styles.td}>
                  <select
                    value={order.statusDelivery}
                    onChange={(e) => updateDeliveryStatus(order.id, e.target.value)}
                  >
                    <option value="Delivered">Delivered</option>
                    <option value="In Process">In Process</option>
                    <option value="Paid">Paid</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className={styles.td}>${order.totalPrice.toFixed(2)}</td>
                <td className={styles.td}>
                  <button onClick={openModal} value={order.id}>
                    See Detail
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}