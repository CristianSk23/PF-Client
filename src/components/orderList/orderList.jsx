import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allOrders,
  filterOrderById,
  updateOrderStatus,
} from "../../redux/action/actions";
import UserPurchaseHistory from "./UserPurchaseHistory";
import styles from "./orderList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function OrderList() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orderHistory);
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    dispatch(allOrders());
  }, [dispatch, update]);



  const [visibleModal, setvisibleModal] = useState(false);
  const [actualData, setactualData] = useState({});
  const [id, setId] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const handleChange = (e) => {
    setId(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const search = () => {
    if (id.trim() !== "") {
      dispatch(filterOrderById(id));
    } else {
      dispatch(allOrders());
    }
  };

  useEffect(() => {
    search();
  }, [id]);

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
  };

  const updateDeliveryStatus = (e, orderId) => {
    e.preventDefault();
    const newStatus = e.target.value;
    updateOrderStatus(orderId, newStatus);
    setTimeout(() => {
      setUpdate(update + 1);
    }, 1000);
  };

  return (
    <div>
      {visibleModal && (
        <UserPurchaseHistory closeModal={openModal} data={actualData} />
      )}
      <h5>Orders List:</h5>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingBottom: "10px",
        }}
      >
        <select
          className="form-select"
          aria-label="Default select example"
          style={{ width: "200px", margin: "2px" }}
          value={selectedStatus}
          onChange={handleStatusChange}
        >
          <option value="All">Select status</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Searching by ID:"
          style={{ margin: "2px", borderRadius: "8px" }}
        />
        <button onClick={search} style={{ margin: "2px" }}>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ color: "#000000" }}
          />
        </button>
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
            orders
              .filter(
                (order) =>
                  selectedStatus === "All" ||
                  order.mercadopagoTransactionStatus ===
                    selectedStatus.toString()
              )
              .map((order) => (
                <tr key={order.id}>
                  <td className={styles.td}>{order.id}</td>
                  <td className={styles.td}>{order.orderDate}</td>
                  <td className={styles.td}>{order.userName}</td>
                  <td className={styles.td}>
                    {order.mercadopagoTransactionStatus}
                  </td>
                  <td className={styles.td}>
                    <select
                      value={order.deliveryStatus}
                      onChange={(e) => updateDeliveryStatus(e, order.id)}
                    >
                      <option value="Delivered">Delivered</option>
                      <option value="In Process">In Process</option>
                      <option value="Paid">Paid</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className={styles.td}>${order.totalPrice.toFixed(2)}</td>
                  <td className={styles.td}>
                    {" "}
                    {/*BOTON CON ESTILADO DE LINK*/}
                    <button
                      className={styles.button}
                      onClick={openModal}
                      value={order.id}
                    >
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
