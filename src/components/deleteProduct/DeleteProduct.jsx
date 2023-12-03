import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cleanSingleProd, deleteProduct, getProductsById } from "../../redux/action/actions";
import { useEffect, useState } from "react";
import styles from "./deleteProduct.module.css";
import NavBar from "../navBar/NavBar";

const DeleteProduct = () => {
  const { id } = useParams();
  const prodById = useSelector((state) => state.singleProduct);
  const [productLoaded, setProductLoaded] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
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

  return (
    <div style={{backgroundColor: "#F8F9F9", minHeight:"700px"}}>
      <NavBar />
    <div className={styles.container}>
        <div className= "d-flex align-items-center justify-content-center">
          <div className="card" style={{width: "30rem", marginTop:"70px"}}>
            <h1 className="text-center">Deleting Product</h1>
              {productLoaded && (
                <img src={prodById?.image} className="card-img-top" alt="..."/>
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
        <div className={styles.confirmationModalContainer}>
          <div className={styles.confirmationModalBackdrop}></div>
          <div className={styles.confirmationModal}>
            <p>Product successfully removed</p>
            <button onClick={handleConfirmationClose}>Go home</button>
          </div>
        </div>
      )}


      </div>
      </div>
  );
};

export default DeleteProduct;