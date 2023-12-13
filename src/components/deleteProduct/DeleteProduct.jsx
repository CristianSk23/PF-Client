import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cleanSingleProd, deleteProduct, getProductsById } from "../../redux/action/actions";
import { useEffect, useState } from "react";
import styles from "./deleteProduct.module.css";
import NavBar from "../navBar/NavBar";
import PopupGeneral from "../popupGeneral/PopupGeneral";
import { useAuth0 } from "@auth0/auth0-react";
import ErrorView from "../error404/Error404";

const DeleteProduct = () => {
  const { id } = useParams();
  const prodById = useSelector((state) => state.products.singleProduct);
  const isUser = useSelector((state) => state.isUser);
  const {isAuthenticated, isLoading} = useAuth0()
  const [productLoaded, setProductLoaded] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [user, setUser] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        id && await dispatch(getProductsById(id));
        setProductLoaded(true);
      } catch (error) {
        
      }
    };
    fetchData();
    return ()=> dispatch(cleanSingleProd())
  }, [id]);

  const handleDelete = async () => {
    try {
      await dispatch(deleteProduct(prodById?.id));
      setProductLoaded(false)
      setShowConfirmation(true);
    } catch (error) {
      
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    navigate(-1);
  };

  if(!isLoading && ((!isAuthenticated && isUser !== "Admin") || isUser === "User")){
    return(
      <div>
        <ErrorView />
      </div>
    )
  }

  return (!isLoading &&
    <div style={{backgroundColor: "#F8F9F9", minHeight:"800px"}}>
      <NavBar />
    <div className={styles.container}>
        <div className= "d-flex align-items-center justify-content-center">
          <div className="card" style={{width: "30rem", marginTop:"100px"}}>
            <h1 className="text-center">Deleting Product</h1>
              {productLoaded && (
                <img src={prodById?.image[0]} className="card-img-top" alt="..."/>
              )}
               <div className="card-body">
                 <h5 className="card-title">{prodById?.nameProd}</h5>
                 <p className="card-text">{prodById?.description}</p>
                    <div className="text-center">
                      <a onClick={handleDelete} className="btn btn-success" style={{margin:"2px"}}>Confirm</a>
                      <a onClick={handleCancel} className="btn btn-danger" style={{margin:"2px"}}>Cancel</a>
            </div>
          </div>
        </div>
      </div>
      {showConfirmation && (
        <PopupGeneral
          textButton="Go home"
          descripcion="Product successfully removed"
          onClick={handleConfirmationClose}
        />
      )}


      </div>
      </div>
  );
};

export default DeleteProduct;

//Product successfully removed