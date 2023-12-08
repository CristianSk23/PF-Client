import {useEffect, useState} from "react";
import styles from "./adminModuleHistoryOrderUser.module.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersByUserId } from "../../redux/action/actions";
import OrderDetailUserByIdPopup from "../orderDetailUserByIdPopup/OrderDetailUserByIdPopup";

const AdminModuleHistoryOrderUser =() =>{
    const { id } = useParams();
    const dispatch = useDispatch()
    const ordersById = useSelector((state) => state.ordersForUserId) || [];
    const [selectedOrder, setSelectedOrder] = useState(null);
    
    useEffect(() => {
        dispatch(getOrdersByUserId(id));
        
    },[])
    const handleSeeDetail = (order) => {
        setSelectedOrder(order);
      };

    const handleClosePopup = () => {
        setSelectedOrder(null);
    };

    return(
        <div>
        <h5>Orders list for user {ordersById[0]?.userName}:</h5>
        <table className="table table-hover">
            <thead>
                <tr>
                <th className={styles.th} scope="col">ID Order</th>
                <th className={styles.th} scope="col">Order Date</th>
                <th className={styles.th} scope="col">User ID</th>
                <th className={styles.th} scope="col">Mercado Pago Status</th>
                <th className={styles.th} scope="col">Delivery Status</th>
                <th className={styles.th} scope="col">Total Amount</th>
                <th className={styles.th} scope="col">Order</th>
                </tr>
            </thead>
                <tbody>
                    {ordersById.map((order) =>(<tr key={order.id}>
                    <td className={styles.td}>{order.id}</td>
                    <td className={styles.td}>{order.orderDate}</td>
                    <td className={styles.td}>{order.UserId}</td>
                    <td className={styles.td}>{order.mercadopagoTransactionStatus}</td>
                    <td className={styles.td}>{order.deliveryStatus}</td>
                    <td className={styles.td}>${order.totalPrice}</td>
                    <td className={styles.td}><Link onClick={() => handleSeeDetail(JSON.parse(order.itemsCart))}>See detail</Link></td>
                </tr>))}
                {ordersById.length == 0 && 
                <tr key="na">
                <td>To date there are no purchase orders</td>
                </tr>}
              </tbody>
        </table>
        {selectedOrder && (
        <OrderDetailUserByIdPopup
          orderDetails={selectedOrder}
          onClose={handleClosePopup}
        />
      )}
    </div>
    )
}

export default AdminModuleHistoryOrderUser;