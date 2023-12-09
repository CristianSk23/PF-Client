import {useEffect, useState} from "react";
import styles from "./moduleHistoryOrderUser.module.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersByUserId } from "../../redux/action/actions";
import OrderDetailUserByIdPopup from "../orderDetailUserByIdPopup/OrderDetailUserByIdPopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ModuleHistoryOrderUser =({idProp}) =>{
    const { id } = useParams();
    const dispatch = useDispatch()
    const ordersById = useSelector((state) => state.ordersForUserId) || [];
    const [selectedOrder, setSelectedOrder] = useState(null);
    const navigate = useNavigate();
    
    
    useEffect(() => {
      if (id != undefined){
        dispatch(getOrdersByUserId(id));
      }
      else{
        dispatch(getOrdersByUserId(idProp));
      }
    },[dispatch])

    const handleSeeDetail = (order) => {
        setSelectedOrder(order);
      };

    const handleClosePopup = () => {
        setSelectedOrder(null);
    };

    const handleCancel = () => {
      navigate(-1);
    };

    return(
        <div style={{backgroundColor:"#F8F9F9", width:"100%", minHeight:"700px"}}>
          <Container>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2"><FontAwesomeIcon icon={faClipboard} /> {ordersById[0]?.userName} Purchase History</h1>
          </div>
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
                    {ordersById?.map((order) =>(<tr key={order.id}>
                    <td className={styles.td}>{order.id}</td>
                    <td className={styles.td}>{order.orderDate}</td>
                    <td className={styles.td}>{order.UserId}</td>
                    <td className={styles.td}>{order.mercadopagoTransactionStatus}</td>
                    <td className={styles.td}>{order.deliveryStatus}</td>
                    <td className={styles.td}>${parseFloat(order.totalPrice).toFixed(2)}</td>
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
        <div className="d-grid gap-2">
          <a className="btn btn-danger" type="button" onClick={ handleCancel }>Back</a>
        </div>
      </Container>
    </div>
    )
}

export default ModuleHistoryOrderUser;