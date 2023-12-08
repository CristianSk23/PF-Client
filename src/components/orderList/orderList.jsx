import styles from "./orderList.module.css";
import { allOrders, filterOrderPurchase } from "../../redux/action/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserPurchaseHistory from "./userPurchaseHistory";

export default function OrderList() {
  const Dispatch = useDispatch();
  const orders = useSelector((state) => state.orderHistory);

  useEffect(() => {
    Dispatch(allOrders());
  }, [Dispatch]);

  const [visibleModal, setvisibleModal] = useState(false);
  const [actualData, setactualData] = useState({});
  const [name,setname] = useState("");

const handleChange = (e) => {
  e.preventDefault();
  setname(e.target.value)
  if(e.target.value.length < 2){
    Dispatch(allOrders());
  }
}

const search = (e) => {
  e.preventDefault();
  Dispatch(filterOrderPurchase(name))
}


  const openModal = (e) => {
    e.preventDefault();
    if (!visibleModal) {
      const data = orders.filter((i) => i.id == e.target.value);
      const itemsCart = data[0].itemsCart;
      const array = JSON.parse(itemsCart);
      setactualData(array);
    }
    setvisibleModal(!visibleModal);
  };

  return (
    <div>
      {visibleModal && (
        <UserPurchaseHistory closeModal={openModal} data={actualData} />
      )}
      {/* VER SI VAMOS A USAR UNA ORDEN DETALLADA Y AGREGAR UN BOTON MAS EN LA TABLA EN CASO DE QUE SEA ASI */}
      <h5>Orders list:</h5> 
      <input type="text" onChange={handleChange} value={name}></input>
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
          {orders.map((order) => (
            <tr key={order.id}>
              <td className={styles.td}>{order.id}</td>
              <td className={styles.td}>{order.orderDate}</td>
              <td className={styles.td}>{order.userName}</td>
              <td className={styles.td}>
                {order.mercadopagoTransactionStatus}
              </td>
              <td className={styles.td}>{order.deliveryStatus}</td>
              <td className={styles.td}>${order.totalPrice}</td>
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
