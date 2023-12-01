import { Link } from "react-router-dom";
import { UserType } from "../../utils/userType";
import { useAuth0 } from "@auth0/auth0-react";


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

    const { isAuthenticated, loginWithRedirect } = useAuth0()
    const handleLogin= async() => {
      await loginWithRedirect()
    }
    const isUser = UserType.USER
  return (
    <div>
      <div className="card" style={{width:"300px", height:"580px"}}>
              <img src={image[0]} className="card-img-top" alt="product" style={{width:"100%", height:"200px", objectFit:"contain"}}/>
              <div className="card-body" style={{textAlign:"center"}}>
                <h5 className="card-title">{nameProd}</h5>
                <p className="card-text">{description}</p>
              </div>
              <div className="card-footer" style={{textAlign:"center"}}>
                <small className="text-body-secondary" style={{fontWeight:"bold"}}>${price}</small>
                <div className="text-center" style={{marginTop:"10px"}}>
        {isUser === UserType.ADMIN ? (
              /* Admin Options */
              <>
                  <button type="button" className="btn btn-success" style={{margin:"2px"}}>
                    <Link to={`/updateProduct/${productId}`} style={{textDecoration:"none", color:"black", margin:"5px"}}>Update</Link>
                  </button>
                  <button type="button" className="btn btn-danger" style={{margin:"2px"}}>
                    <Link to={`/deleteProduct/${productId}`} style={{textDecoration:"none", color:"black", margin:"5px"}}>Delete</Link>
                  </button>
                  
              </>
            ) : isUser === UserType.USER ? (
              /* User Options */
             <>
                  <button type="button" className="btn btn-success" style={{margin:"2px"}}>
                    <Link to={`/shopping`} style={{textDecoration:"none", color:"black", margin:"5px"}}>Add to my cart</Link>
                  </button>
            </>   
            ) : isUser === UserType.INVITE ? (
              /* Invite Options */
             <>
            {!isAuthenticated && <button className="dropdown-item" onClick={handleLogin}>Add to my cart</button>}
            {isAuthenticated && <button className="dropdown-item">Add to my cart</button>}
            </>
 
            ) : null}
         
    </div>
    </div>
              </div>
          </div> 
  );
};
export default Card;


