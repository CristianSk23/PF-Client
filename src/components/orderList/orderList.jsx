import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allOrders, filterOrderPurchase, updateOrderStatus } from "../../redux/action/actions";
import UserPurchaseHistory from "./userPurchaseHistory";
import styles from "./orderList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

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
      <h5>Orders List:</h5>
      <div style={{display: "flex", justifyContent: "flex-end", paddingBottom:"10px" }}> 
      <select className="form-select" aria-label="Default select example" style={{width:"200px", margin:"2px"}}>
          <option selected hidden disabled>Select status</option> {/* DARLE FUNCIONABILIDAD AL SELECT */}
          <option value="0">All</option>
          <option value="1">Approved</option>
          <option value="2">Pending</option>
          <option value="3">Rejected</option>
      </select>
        <input type="text" onChange={handleChange} value={name} placeholder="Inserte dato..." style={{margin:"2px", borderRadius:"8px"}}/>
        {/* Modificar el place holder segun el dato que vayamos a pedir finalmente ahi */}
        <button onClick={search} style={{ margin:"2px"}}><FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#000000",}} /></button>
      </div>

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
                <td className={styles.td}> {/*BOTON CON ESTILADO DE LINK*/}
                  <button className={styles.button} onClick={openModal} value={order.id}>
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