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
import { useAuth0 } from "@auth0/auth0-react";
import ErrorView from "../error404/Error404";

const ModuleHistoryOrderUser =({idProp}) =>{
    const {isAuthenticated, isLoading} = useAuth0()
    const { id } = useParams();
    const dispatch = useDispatch()
    const ordersById = useSelector((state) => state.ordersForUserId) || [];
    const [selectedOrder, setSelectedOrder] = useState(null);
    const isUser = useSelector((state) => state.isUser);
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
      console.log("Order itemsCart:", order.itemsCart);
      setSelectedOrder(order);
  };
    const handleClosePopup = () => {
        setSelectedOrder(null);
    };

    const handleCancel = () => {
      navigate(-1);
    };

    if(!isLoading && ((!isAuthenticated && isUser !== "Admin") || isUser === "User")){
      return(
        <div>
          <ErrorView/>
        </div>
      )
    }

    return(!isLoading &&
      <div>
      {isUser === "Admin" ? (
        <div style={{backgroundColor:"#F8F9F9", width:"100%", minHeight:"780px"}}>
        <Container>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2"><FontAwesomeIcon icon={faClipboard} /> Orders list for user {ordersById[0]?.userName}</h1>
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
                <td align="center" colSpan="7"><strong>To date there are no purchase orders</strong></td>
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
      ) : (
        <div style={{backgroundColor:"#F8F9F9", width:"100%", minHeight:"700px"}}>
        <Container>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2"><FontAwesomeIcon icon={faClipboard} /> Your Orders {ordersById[0]?.userName}</h1>
        </div>
        <table className="table table-hover">    
            <thead>
                <tr>
                <th className={styles.th} scope="col">Number order</th>
                <th className={styles.th} scope="col">Order Date</th>
                <th className={styles.th} scope="col">Delivery Status</th>
                <th className={styles.th} scope="col">Total Amount</th>
                <th className={styles.th} scope="col">Order</th>
                </tr>
            </thead>
                <tbody>
                    {ordersById?.map((order) =>(<tr key={order.id}>
                    <td className={styles.td}>{order.id}</td>
                    <td className={styles.td}>{order.orderDate}</td>
                    <td className={styles.td}>{order.deliveryStatus}</td>
                    <td className={styles.td}>${parseFloat(order.totalPrice).toFixed(2)}</td>
                    <td className={styles.td}><span onClick={() => handleSeeDetail(JSON.parse(order.itemsCart))}>See detail</span></td>
                </tr>))}
                {ordersById.length == 0 && 
                <tr key="na">
                <td align="center" colSpan="7"><strong>To date there are no purchase orders</strong></td>
                </tr>}
              </tbody>
        </table>
        {selectedOrder && (
        <OrderDetailUserByIdPopup
          orderDetails={selectedOrder}
          onClose={handleClosePopup}
          idUser={idProp || id}
        />
      )}
        <div className="d-grid gap-2">
          <a className="btn btn-danger" type="button" onClick={ handleCancel }>Back</a>
        </div>
      </Container>
    </div>
      )}
        </div>
    )
}

export default ModuleHistoryOrderUser;