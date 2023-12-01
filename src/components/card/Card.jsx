import { Link } from "react-router-dom";
import { UserType } from "../../utils/userType";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { typeUser } from "../../redux/action/actions";


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
    const dispatch = useDispatch()
    const handleLogin= async() => {
      await loginWithRedirect()
    }
    const isUser = useSelector((state) => state.isUser)

    useEffect(() => {
        dispatch(typeUser())
    }, [isAuthenticated, isUser, loginWithRedirect])


  return (
    
    <div>
      <div className="card" style={{width:"300px", height:"620px"}}>
      <Link to={`/detail/${productId}`} style={{ textDecoration: "none", color: "black" }}>
              <img src={image[0]} className="card-img-top" alt="product" style={{width:"100%", height:"200px", objectFit:"contain"}}/></Link>
              <div className="card-body" style={{textAlign:"center"}}>
                <h5 className="card-title">{nameProd}</h5>
                <p className="card-text">{description}</p>
              </div>
              <div className="card-footer" style={{textAlign:"center"}}>
                <small className="text-body-secondary" style={{fontWeight:"bold", fontSize:"26px"}}>${price}</small>
                <div className="text-center" style={{marginTop:"10px"}}>
        {isUser === "Admin" ? (
              /* Admin Options */
              <>
                  <button type="button" className="btn btn-success" style={{margin:"2px"}}>
                    <Link to={`/updateProduct/${productId}`} style={{textDecoration:"none", color:"black", margin:"5px"}}>Update</Link>
                  </button>
                  <button type="button" className="btn btn-danger" style={{margin:"2px"}}>
                    <Link to={`/deleteProduct/${productId}`} style={{textDecoration:"none", color:"black", margin:"5px"}}>Delete</Link>
                  </button>
                  
              </>
            ) : isUser === "User" ? (
              /* User Options */
             <>
                  <button type="button" className="btn btn-info" style={{margin:"2px"}}>
                    <Link to={`/shopping`} style={{textDecoration:"none", color:"black", margin:"5px"}}>Add to my cart</Link>
                  </button>
            </>   
            ) : isUser === "Invited" ? (
              /* Invite Options */
             <>
            {!isAuthenticated && <button type="button" className="btn btn-secondary" onClick={handleLogin} style={{margin:"5px"}}>Add to my cart</button>}
            {isAuthenticated && <button type="button" className="btn btn-secondary">Add to my cart</button>}
            </>
 
            ) : null}
         
    </div>
    </div>
              </div>
          </div> 
  );
};
export default Card;


