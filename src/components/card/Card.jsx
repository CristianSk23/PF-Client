import { Link } from "react-router-dom";
import styles from "./card.module.css";
import { useDispatch, useSelector } from "react-redux";
import { UserType } from "../../utils/userType";
import { typeUser, addToCart } from "../../redux/action/actions";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

//AUMENTE EL PAGINADO A 12 PRODUCTOS POR PAGINA, MUESTRA DE A 4 O DE A 5 SEGUN LA RESOLUCION DEL MONITOR
const Card = ({
  productId,
  categoryId,
  nameProd,
  priceOnSale,
  brand,
  description,
  price,
  discountPercentage,
  image,
  active,
  tags,
  stock,
}) => {
  const dispatch = useDispatch();


    const { isAuthenticated, loginWithRedirect } = useAuth0()

    const isUser = useSelector((state) => state.isUser)
    const userID = useSelector((state) => state.user.id)
    const products = useSelector((state) => state.cart.items)
    const allproducts = useSelector((state) => state.products.allProducts)
    
    const handleLogin= async() => {
      await loginWithRedirect()
    }

    const handleBuy = (clickedProductId) => {
      
      let clickedProduct = products.find((item)=> item.id == clickedProductId)
      
      clickedProduct == undefined ? clickedProduct = allproducts.find((item)=> item.id == clickedProductId) : clickedProduct
      
      if (clickedProduct) {
        
        dispatch(addToCart(userID, clickedProductId, (clickedProduct?.quantity + 1 || 1)));
      }
      
     };

     useEffect(()=> {

     },[handleBuy])

  return (
    <div>
      <div className="card" style={{ width: "300px", height: "700px" }}>
        <Link
          to={`/detail/${productId}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <img
            src={image[0]}
            className="card-img-top"
            alt="product"
            style={{ width: "100%", height: "200px", objectFit: "contain" }}
          />
        </Link>
        <div className="card-body" style={{ textAlign: "center" }}>
          <h5 className="card-title">{nameProd}</h5>
          <p className="card-text">{description}</p>
          {discountPercentage > 0 ? (
            <>
              <p
                className="card-text"
                style={{ textDecoration: "line-through", marginRight: "5px", color: "red" }}
              >
                ${price.toFixed(2)}
              </p>
              <p
                className="card-text"
                style={{ color: "green", fontWeight: "bold" }}
              >
                {discountPercentage}% OFF
              </p>
              <small
                className="text-body-secondary"
                style={{
                  fontWeight: "bold",
                  fontSize: "18px",
                  marginLeft: "5px",
                }}
              >
                ${priceOnSale?.toFixed(2)}
              </small>
            </>
          ) : (
            <p className="card-text">${price.toFixed(2)}</p>
          )}
        </div>
        <div className="card-footer" style={{ textAlign: "center" }}>
          <div className="text-center" style={{ marginTop: "10px" }}>
            {isUser === "Admin" ? (
              /* Admin Options */
              <>
                <button
                  type="button"
                  className="btn btn-success"
                  style={{ margin: "2px" }}
                >
                  <Link
                    to={`/updateProduct/${productId}`}
                    style={{
                      textDecoration: "none",
                      color: "black",
                      margin: "5px",
                    }}
                  >
                    Update
                  </Link>
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  style={{ margin: "2px" }}
                >
                  <Link
                    to={`/deleteProduct/${productId}`}
                    style={{
                      textDecoration: "none",
                      color: "black",
                      margin: "5px",
                    }}
                  >
                    Delete
                  </Link>
                </button>
              </>
            ) : isUser === "User" ? (
              /* User Options */

             <> 
              {isAuthenticated && <button id={productId} type="button" className="btn btn-success" style={{margin:"2px"}} onClick={() => handleBuy(productId)}>
              <FontAwesomeIcon icon={faCartShopping} />
              </button>}
            </>   

            ) : isUser === "Invited" ? (
              /* Invite Options */
              <>
                {!isAuthenticated && (
                  <button
                    className="btn btn-secondary"
                    onClick={handleLogin}
                    style={{ margin: "2px" }}
                  >
                    <FontAwesomeIcon icon={faCartShopping} />
                  </button>
                )}
                {isAuthenticated && (
                  <button
                    type="button"
                    className="btn btn-success"
                    style={{ margin: "2px" }}
                    onClick={handleBuy}
                  >
                    <FontAwesomeIcon icon={faCartShopping} />
                  </button>
                )}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
