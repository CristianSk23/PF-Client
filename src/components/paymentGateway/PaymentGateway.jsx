import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/action/actions";
import styles from "./paymentGateway.module.css"; 
import RingLoader  from "react-spinners/RingLoader"; // spinner para el loading 
import axios from "axios"; // hay que hacer redux. hasta entonces, no eliminar
import { useNavigate } from "react-router-dom";
import logoImage from "../../assets/logo.jpg";
import { useAuth0 } from "@auth0/auth0-react";
import ErrorView from "../error404/Error404";

const PaymentGateway=()=>{
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart)
  const userInSession = useSelector((state) => state.user)
  const catchError = useSelector((state) => state.catchError)
  const isUser = useSelector((state) => state.isUser)
  const {isAuthenticated} = useAuth0()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
        id: userInSession?.id || "", 
        name: userInSession?.name || "", 
        lastName: userInSession?.lastName || "", 
        email: userInSession?.email,
        address: userInSession?.address || "" ,
        phone: userInSession?.phone || "",
        identityCard: userInSession?.identityCard || "",
        postalCode: userInSession?.postalCode || "",
        city: userInSession?.city || "",
        active: userInSession?.active,
        typeUser: userInSession?.typeUser,
  })

  const totalCart = cart.items.reduce((accumulator, item) => {
    let newPrice = item.priceOnSale || item.price;
    return accumulator + newPrice * item.quantity;
  }, 0).toFixed(2);



  const handleChange = (event) =>{
    setUserInfo({
      ...userInfo,
      [event.target.name]: event.target.value,
    });
  }

  const items = cart.items.map((item)=>{
      let sellPrice = item.priceOnSale? item.priceOnSale : item.price;
          return {
              title: item.nameProd,
              quantity: item.quantity,
              unit_price: sellPrice,  
              currency_id: "ARG",
              picture_url: item.image[0],
              description: item.description, 
              }
      });


  const purchaseHandler = (event) => {
    event.preventDefault();
    setLoading(true)   

    // Si hay cambios en los datos del usuario, actualizo
    if( userInfo.name != userInSession?.name || 
        userInfo.lastName != userInSession?.lastName || 
        userInfo.address != userInSession?.address || 
        userInfo.phone != userInSession?.phone || 
        userInfo.identityCard != userInSession?.identityCard || 
        userInfo.postalCode != userInSession?.postalCode || 
        userInfo.city != userInSession?.city)
    {
      console.log('entro a actualizar User');
      console.log(userInfo);

      dispatch(updateUser(userInfo))
    }
    // VER DE AGREGAR INFORMACION PARA EL CART DE Mercadopago. Ej address,phone etc.
    const newOrder = { items,
                       payer:{
                        id: userInfo.id,
                        name: userInfo.name,
                        surname: userInfo.lastName,
                        email: userInfo.email,
                        idenification:{
                          number: userInfo.identityCard
                        },
                        address: {
                          street_name: userInfo.address,
                          zip_code: userInfo.postalCode
                        }
                       }
    }
    //------------------------------------------------------------------------------

    console.log('CatchError');
    console.log(catchError);
    if(catchError===""){
      console.log('Creo la Order');
      console.log(newOrder);
      axios
      .post("/payments/createOrder", newOrder)
      .then((response) => {
          window.location.href = response.data.init_point;
          setLoading(false) 
      })
      .catch((error) => {
        setLoading(false)
        console.log(error)
      });
    }
  }

  const handleCancel = () => {
    navigate(-1);
  };

  if(!isAuthenticated && isUser === "Invited"){
    return(
      <div>
        <ErrorView/>
      </div>
    )
  }

    return(
      <div className="container">  
          <div className="py-5 text-center">
            <img className="d-block mx-auto mb-4" src={logoImage} alt="logo" height="57px"/>
            <h2 style={{marginTop:"-20px"}}>Checkout form</h2>
          </div>

          <div className="row g-5">
            <div className="col-md-5 col-lg-4 order-md-last">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-primary">Your cart</span>
                <span className="badge bg-primary rounded-pill">{cart.items.length}</span>
              </h4>
              <ul className="list-group mb-3">
                {cart.items.map((item,index)=>{
                  let sellPrice = item.priceOnSale > 0 ? item.priceOnSale?.toFixed(2) : item.price?.toFixed(2);
                  cart.totalPrice += sellPrice*item.quantity;
                  return (
                  <li className="list-group-item d-flex justify-content-between lh-sm" key={index}>
                    <div>
                      <h6 className="my-0">{item.quantity} x {item.nameProd}</h6>
                    </div>
                    <span className="text-body-secondary">${sellPrice*item.quantity}</span>
                  </li>)
                })}
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total: </span>
                  <strong>${totalCart}</strong>
                </li>
              </ul>
            </div>
            <div className="col-md-7 col-lg-8">
              <h4 className="mb-3">Billing address</h4>
              <form className="needs-validation" onSubmit={purchaseHandler}>
                <div className="row g-3">
                  
                  <div className="col-12">
                    <label className="form-label">Email</label>
                    <div className="input-group has-validation">
                      <span className="input-group-text">@</span>
                      <input type="email" className="form-control" id="email" placeholder="" value={userInfo.email} readOnly required/>
                      <div className="invalid-feedback">
                        Please enter a valid email address for shipping updates.
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="" name="name" value={userInfo.name} onChange={handleChange} required/>
                    <div className="invalid-feedback">
                      Valid name is required.
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <label className="form-label">lastName</label>
                    <input type="text" className="form-control" id="lastName" placeholder="" name="lastName" value={userInfo.lastName} onChange={handleChange} required/>
                    <div className="invalid-feedback">
                      Valid lastName is required.
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <label className="form-label">Identity Card</label>
                    <input type="text" className="form-control" id="identityCard" placeholder="" name="identityCard" value={userInfo.identityCard} onChange={handleChange} required/>
                    <div className="invalid-feedback">
                      Valid identity card is required.
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <label className="form-label">Phone</label>
                    <input type="number" className="form-control" id="phone" placeholder="Enter your phone number" name="phone" value={userInfo.phone} onChange={handleChange} required/>
                    <div className="invalid-feedback">
                      Please enter your phone number.
                    </div>
                  </div>

                  <div className="col-12">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" placeholder="" name="address" value={userInfo.address} onChange={handleChange} required/>
                    <div className="invalid-feedback">
                      Please enter your shipping address.
                    </div>
                  </div>


                  <div className="col-md-6">
                    <label className="form-label">City</label>
                    <input type="text" className="form-control" id="city" name="city" value={userInfo.city} onChange={handleChange} required/>
                    <div className="invalid-feedback">
                      Please provide a valid city.
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Postal Code</label>
                    <input type="number" className="form-control" id="postalCode" placeholder="" name="postalCode" value={userInfo.postalCode} onChange={handleChange} required/>
                    <div className="invalid-feedback">
                      Postal code required.
                    </div>
                  </div>
                </div>
                <hr className="my-4"/>

                <h4 className="mb-3">Payment</h4>

                <div className="my-3">
                  <div className="form-check">
                    <input id="mercadoPago" name="paymentMethod" type="radio" className="form-check-input" checked readOnly required/>
                    <label className="form-check-label">Mercado Pago</label>
                  </div>
                </div>

                <hr className="my-4"/>
                
                <button className="w-100 btn btn-primary btn-lg" type="submit" >Continue to pay</button>
                <a className="w-100 btn btn-danger btn-lg" type="button"  style={{marginTop:"8px"}} onClick={ handleCancel }>Back</a>
              </form>
            </div>
          </div>

          <footer className="my-5 pt-5 text-body-secondary text-center text-small">
          <p className="mb-1">&copy; 2023 TechNook</p>

        </footer>
        {loading &&
        <div className={styles.overlay}>
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
    )
}
export default PaymentGateway