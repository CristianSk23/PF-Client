
import { removeOneCart, increaseQuantity, decreaseQuantity, getCartById } from "../../redux/action/actions"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from 'react-router-dom';
import NavBar from "../navBar/NavBar";
import styles from "./shoppingCart.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
import ErrorView from "../error404/Error404";
import Button from "react-bootstrap/Button";


const ShoppingCart = ({}) => {

 const dispatch = useDispatch(); 
 const navigate = useNavigate();
 const [stock, setStock] = useState("")

 const products = useSelector((state) => state.cart.items)
 const userID = useSelector((state) => state.user.id)

 const isUser = useSelector((state) => state.isUser)
 const {isAuthenticated, isLoading} = useAuth0()
 

 useEffect(() => {
    userID && dispatch(getCartById(userID))
  }, [userID]);

  const totalCart = products.reduce((accumulator, item) => {
    let newPrice = item.priceOnSale || item.price;
    return accumulator + newPrice * item.quantity;
  }, 0).toFixed(2);

 const DeleteCart = (productsid, nameProd, userID) => {
    dispatch(removeOneCart(productsid, nameProd, userID))
    toast.success('Product has been removed from cart!', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        // theme: "dark",
        // theme: "light",
        });
 }

 const IncreaseQuantity = (userID, productsid, quantityPROD) => {
    const itemToCheck = products.find(
        (item) => item.id === productsid
      );
      if(itemToCheck.stock < itemToCheck.quantity + 1) {
        setStock("MAX")
      }
    dispatch(increaseQuantity(userID, productsid, quantityPROD))
 }

 const DecreaseQuantity = (userID, productsid, quantityPROD) => {
    setStock("");
    dispatch(decreaseQuantity(userID, productsid, quantityPROD))
 }

 const handleCancel = () => {
    navigate(-1);
  };

  const handleStock = () => {
    if (stock === "MAX") {
        // return "There are no more units available for this product"
        toast.warning("There are no more units available for this product", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            // theme: "dark",
            // theme: "light",
            });
    } 
    return ""
  }

if(!isLoading && !isAuthenticated && isUser === "Invited"){
    return(
        <div>
            <ErrorView/>
        </div>
    )
}


  
 return(
 <div style={{backgroundColor:"#F8F9F9", minHeight:"750px", minWidth:"100%"}}>
    <NavBar/>
      {products.length > 0 && (
                <div className="container" style={{marginTop: "62px"}}>
                <h1 style={{textAlign:"center", marginBottom:"40px"}}>Shopping Cart</h1>
                <p style={{"color": "red"}}>{handleStock()}</p>
                <table className="table table-hover table-responsive">
                    <thead>
                        <tr>
                        <th className={styles.th} scope="col">Product</th>
                        <th className={styles.th} scope="col">Name</th>
                        <th className={styles.th} scope="col">Price</th>
                        <th className={styles.th} scope="col">Quantity</th>
                        <th className={styles.th} scope="col">Total Price</th>
                        <th className={styles.th} scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    products.map((item)=>{
                        return(
                            <tr key={item.id}>
                            <td className={styles.td}><img src={item.image[0]} style={{width:"40px", height:"40px", objectFit:"contain"}}/></td>
                            <td className={styles.td} style={{margin:"500px"}}>{item.nameProd}</td>
                            <td className={styles.td}>{item.priceOnSale?.toFixed(2) || item.price.toFixed(2)} $</td>  
                            <td className={styles.td}>
                            <div className="container">
                                <div className="btn-group" role="group" aria-label="Botones de Suma y Resta">
                                    <button type="button" className="btn btn-primary" onClick={()=>DecreaseQuantity(userID, item.id, item.quantity - 1)} style={{marginTop:"-6px"}}>
                                    -
                                    </button>
                                    <div style={{padding:"10px", height:"1px", marginTop:"-9px"}}>
                                        <p>{item.quantity}</p>
                                    </div>
                                    <button type="button" className="btn btn-primary" onClick={()=>IncreaseQuantity(userID, item.id, item.quantity + 1)} style={{marginTop:"-6px"}}>
                                    +
                                    </button>
                                </div>
                            </div>
                            </td>
                            <td className={styles.td}>{((item.priceOnSale?.toFixed(2) || item.price.toFixed(2))*item.quantity).toFixed(2)}$</td>
                            <td className={styles.td}>
                                <button className={styles.button} onClick={()=>DeleteCart(item.id, item.nameProd, userID)}>
                                    <FontAwesomeIcon icon={faTrash} style={{ color: "#dd3636", }} />
                                </button>
                            </td>
                        </tr>
                        )
                    })                   
                    }
                    <tr>
                    <td align="center" colSpan="6" style={{fontSize:"20px"}}><strong>Cart Total: ${totalCart}</strong></td>
                    </tr>
                    </tbody>
                </table>
                <div className="text-center" style={{marginTop:"-16px"}}>
                <div className="d-flex justify-content-center">
                {products.length > 0 &&
                    <Button 
                    className="mx-2 btn-md"
                    variant="primary"
                    type="submit"
                    style={{margin:"8px", width:"200px"}}>
                        <Link
                            to={`/paymentGateway`}
                            style={{
                            textDecoration: "none",
                            color: "white",
                            }}
                        >
                            Confirm and payment
                        </Link>
                    </Button>}
                    <a className="btn btn-danger mx-2 btn-md" type="button" style={{margin:"8px", width:"200px"}} onClick={ handleCancel }>Back</a>
                </div>
                </div>
            </div>
      )} {products.length === 0 && (
        <div className="container" style={{marginTop: "56px"}}>
        <h1 style={{textAlign:"center", marginBottom:"40px"}}>Shopping Cart</h1>
        <table className="table table-hover">
            <thead>
                <tr>
                <th className={styles.th} scope="col">Product</th>
                <th className={styles.th} scope="col">Name</th>
                <th className={styles.th} scope="col">Price</th>
                <th className={styles.th} scope="col">Quantity</th>
                <th className={styles.th} scope="col">Total Price</th>
                <th className={styles.th} scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td align="center" colSpan="6"><strong>Empty shopping cart...</strong></td>
                </tr>
            </tbody>
        </table>
        <div className="d-flex justify-content-center" style={{marginTop:"-16px"}}>
            <a className="btn btn-danger mx-2 btn-md" type="button" style={{margin:"8px", width:"180px"}} onClick={ handleCancel }>Back</a>
        </div>
    </div>
    )}

</div>

)}
export default ShoppingCart;
            