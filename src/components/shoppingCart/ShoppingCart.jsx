
import { removeOneCart, increaseQuantity, decreaseQuantity } from "../../redux/action/actions"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Link } from 'react-router-dom';
import NavBar from "../navBar/NavBar";
import styles from "./shoppingCart.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const ShoppingCart = ({}) => {

 const dispatch = useDispatch(); 
 const navigate = useNavigate();

 const products = useSelector((state) => state.cart.items)
 
 useEffect(() => {
    console.log('Carrito actualizado:', products);
  }, [products]);

  const totalCart = products.reduce((accumulator, item) => {
    let newPrice = item.priceOnSale || item.price;
    return accumulator + newPrice * item.quantity;
  }, 0).toFixed(2);

 const DeleteCart = (productsid) => {
    dispatch(removeOneCart(productsid))
 }

 const IncreaseQuantity = (productsid) => {
    dispatch(increaseQuantity(productsid))
 }

 const DecreaseQuantity = (productsid) => {
    dispatch(decreaseQuantity(productsid))
 }

 const handleCancel = () => {
    navigate(-1);
  };

  
 return(
 <div style={{backgroundColor:"#F8F9F9", minHeight:"800px", minWidth:"1550px"}}>
    <NavBar/>
      {products.length > 0 && (
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
                    {
                    products.map((item)=>{
                        return(
                            <tr key={item.id}>
                            <td className={styles.td}><img src={item.image} style={{width:"40px", height:"40px", objectFit:"contain"}}/></td>
                            <td className={styles.td} style={{margin:"500px"}}>{item.nameProd}</td>
                            <td className={styles.td}>{item.priceOnSale?.toFixed(2) || item.price.toFixed(2)} $</td>  
                            <td className={styles.td}>
                            <div className="container">
                                <div className="btn-group" role="group" aria-label="Botones de Suma y Resta">
                                    <button type="button" className="btn btn-primary" onClick={()=>DecreaseQuantity(item.id)} style={{marginTop:"-6px"}}>
                                    -
                                    </button>
                                    <div style={{padding:"10px", height:"1px", marginTop:"-9px"}}>
                                        <p>{item.quantity}</p>
                                    </div>
                                    <button type="button" className="btn btn-primary" onClick={()=>IncreaseQuantity(item.id)} style={{marginTop:"-6px"}}>
                                    +
                                    </button>
                                </div>
                            </div>
                            </td>
                            <td className={styles.td}>{((item.priceOnSale?.toFixed(2) || item.price.toFixed(2))*item.quantity).toFixed(2)}$</td>
                            <td className={styles.td}>
                                <button className={styles.button} onClick={()=>DeleteCart(item.id)}>
                                    <FontAwesomeIcon icon={faTrash} style={{ color: "#dd3636", }} />
                                </button>
                            </td>
                        </tr>
                        )
                    })                   
                    }
                    <tr>
                    <td align="center" colSpan="6"><strong>Total Carts: ${totalCart}</strong></td>
                    </tr>
                    </tbody>
                </table>
                <div className="d-grid gap-2">
                {products.length > 0 &&
                    <button className="btn btn-primary" type="button"><Link Link to="/paymentGateway" style={{color:"white", textDecoration:"none"}}>
                    Confirm and Payment</Link></button>}
                    <a className="btn btn-danger" type="button" onClick={(e) => { e.preventDefault; handleCancel }}>Back</a>
                </div>
            </div>
      )}
    </div>
    
    )}
        
    
export default ShoppingCart;
/*
          <table className="table">
                <thead>
                    <tr>
                        <th>Products</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                {
                    products.map((item)=>{
                        return(
                            <tr>
                            <td><img src={item.image} style={{width:'100px',height:'80px'}}/></td>
                            <td>{item.priceOnSale?.toFixed(2) || item.price.toFixed(2)} $</td>  
                            <td>
                                    <span className="btn btn-primary" style={{margin:'2px'}} onClick={()=>DecreaseQuantity(item.id)}>-</span>
                                    <span className="btn btn-info">{item.quantity}</span>
                                    <span className="btn btn-primary" style={{margin:'2px'}} onClick={()=>IncreaseQuantity(item.id)}>+</span>
                            </td>
                            <td>{((item.priceOnSale?.toFixed(2) || item.price.toFixed(2))*item.quantity).toFixed(2)}$</td>
                            <button onClick={()=>DeleteCart(item.id)}>X</button>
                        </tr>
                        )
                    })
                        
                }
                <tr>
                    <td colSpan="5">Total Carts</td>
                    <td>{totalCart} $</td>
                </tr>
                <tr>
                    <td colSpan="6">
                    {products.length > 0 && (
                        <Link to="/paymentGateway" className="btn btn-success">
                            Confirm and Payment
                        </Link>
                    )}
                    </td>
                </tr>
                </tbody>    
            </table>

*/



  /*
import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./shoppingCart.module.css"
import RingLoader  from "react-spinners/RingLoader";
import axios from "axios"; // hay que hacer redux. hasta entonces, no eliminar
import data from "../../assets/data" // Eliminar - es del carrito -
import { useNavigate } from "react-router-dom";
import NavBar from "../navBar/NavBar";

export default function ShoppingCart(){
    const [cantidad, setCantidad] = useState(0);
    const navigate = useNavigate();
    
    // Confirmation button functions -----------------------------------------------------
    useEffect(() => {
        return setLoading(false)
    }, [])
    
    const [loading, setLoading] = useState(false);

    const items = data.items.map((item)=>{
        let sellPrice = item.priceOnSale > 0 ? item.priceOnSale : item.price;
            return {
                title: item.nameProd,
                quantity: item.quantityProd,
                unit_price: sellPrice,  
                currency_id: "ARG",
                picture_url: item.image,
                description: item.description, 
                }
        });

    const purchaseHandler = () => {
        setLoading(!loading)
        axios
        .post("http://localhost:3001/payments/createOrder", {...data, items: items})
        .then((response) => {
            window.location.href = response.data.init_point;
        })
        .catch((error) => console.log(error));
        setLoading(!loading)
    };
// ----------------------------------------------------------------------------------------

    const sumar = () => {
      setCantidad(cantidad + 1);
    };
  
    const restar = () => {
      if (cantidad > 0) {
        setCantidad(cantidad - 1);
      }
    };

    const handleCancel = () => {
        navigate(-1);
      };
  
    return(
        <div style={{backgroundColor:"#F8F9F9", minHeight:"800px"}}>

        <NavBar />

        <div className="container" style={{marginTop: "56px"}}>
            <h1 style={{textAlign:"center", marginBottom:"40px"}}>Shopping Cart</h1>
            <table className="table table-hover">
                <thead>
                    <tr>
                    <th className={styles.th} scope="col">#</th>
                    <th className={styles.th}></th>
                    <th className={styles.th} scope="col">Name</th>
                    <th className={styles.th} scope="col">Price</th>
                    <th className={styles.th} scope="col"></th>
                    <th className={styles.th} scope="col">Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th className={styles.th} scope="row">1</th>
                    <td className={styles.td}><img src="https://acdn.mitiendanube.com/stores/001/474/949/products/223551-fdaddbf6711da206de16325074073443-640-0.png" className="card-img-top" alt="product" style={{width:"100%", height:"80px", objectFit:"contain"}}/></td>
                    <td className={styles.td}>Samunsung TV 40 Pulgadas</td>
                    <td className={styles.td}>$5.000</td>
                    <td className={styles.td}>
                        <div className="container">
                            <div className="btn-group" role="group" aria-label="Botones de Suma y Resta">
                                <button type="button" className="btn btn-light" onClick={restar} style={{marginTop:"-6px"}}>
                                -
                                </button>
                                <div style={{padding:"10px", height:"1px", marginTop:"-10px"}}>
                                    <p>{cantidad}</p>
                                </div>
                                <button type="button" className="btn btn-light" onClick={sumar} style={{marginTop:"-6px"}}>
                                +
                                </button>
                            </div>
                        </div>
                    </td>
                    <td className={styles.td}><button className={styles.button}><FontAwesomeIcon icon={faTrash} style={{ color: "#dd3636", }} />
                            </button></td>
                    </tr>
                    <tr>
                    <th className={styles.th} scope="row">2</th>
                    <td className={styles.td}><img src="https://arcorencasa.com/wp-content/uploads/2023/09/20230904-10374.jpg" className="card-img-top" alt="product" style={{width:"100%", height:"80px", objectFit:"contain"}}/></td>
                    <td className={styles.td}>Chocolate Block</td>
                    <td className={styles.td}>$5</td>
                    <td className={styles.td}>
                        <div className="container">
                            <div className="btn-group" role="group" aria-label="Botones de Suma y Resta">
                                <button type="button" className="btn btn-light" onClick={restar} style={{marginTop:"-6px"}}>
                                -
                                </button>
                                <div style={{padding:"10px", height:"1px", marginTop:"-10px"}}>
                                    <p>{cantidad}</p>
                                </div>
                                <button type="button" className="btn btn-light" onClick={sumar} style={{marginTop:"-6px"}}>
                                +
                                </button>
                            </div>
                        </div>
                    </td>
                    <td className={styles.td}><button className={styles.button}><FontAwesomeIcon icon={faTrash} style={{ color: "#dd3636", }} />
                            </button></td>
                    </tr>
                    <tr>
                    <th className={styles.td} scope="row">3</th>
                    <td className={styles.td}><img src="https://images.fravega.com/f500/937806da60c4940ee2c613372dd051c9.jpg" className="card-img-top" alt="product" style={{width:"100%", height:"80px", objectFit:"contain"}}/></td>
                    <td className={styles.td}>Notebook Lenovo</td>
                    <td className={styles.td}>$900</td>
                    <td className={styles.td}>
                        <div className="container">
                            <div className="btn-group" role="group" aria-label="Botones de Suma y Resta">
                                <button type="button" className="btn btn-light" onClick={restar} style={{marginTop:"-6px"}}>
                                -
                                </button>
                                <div style={{padding:"10px", height:"1px", marginTop:"-10px"}}>
                                    <p>{cantidad}</p>
                                </div>
                                <button type="button" className="btn btn-light" onClick={sumar} style={{marginTop:"-6px"}}>
                                +
                                </button>
                            </div>
                        </div>
                    </td>
                    <td className={styles.td}><button className={styles.button}><FontAwesomeIcon icon={faTrash} style={{ color: "#dd3636", }} />
                            </button></td>
                    </tr>
                </tbody>
            </table>
            <div className="d-grid gap-2">
                <button className="btn btn-primary" type="button" onClick={purchaseHandler}>Confirm</button>
                <button className="btn btn-danger" type="button" onClick={handleCancel}>Cancel</button>
            </div>
            {loading && <div className={styles.overlay}>
                <RingLoader
                color="#36d7b7"
                loading={loading}
                cssOverride={{}}
                height={15}
                radius={0}
                width={2}
                />
            </div>}
        </div>

</div>

    );
}*/

