import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct, getProductsById } from "../../redux/action/actions";
import { useEffect, useState } from "react";
import styles from "./deleteProduct.module.css";

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
  }, [id]);

  const handleDelete = async () => {
    try {
      await dispatch(deleteProduct(prodById?.id));
      setShowConfirmation(true);
      setProductLoaded(false)
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
    <div className={styles.container} style={{marginTop:"25px"}}>
        <div className= "d-flex align-items-center justify-content-center">
          <div className="card" style={{width: "30rem"}}>
            <h1>Deleting Product</h1>
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
  );
};

export default DeleteProduct;