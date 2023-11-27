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
        await dispatch(getProductsById(id));
        setProductLoaded(true);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchData();
  }, [dispatch, id]);

  const handleDelete = async () => {
    try {
      console.log("prodById: "+prodById?.id);
      await dispatch(deleteProduct(prodById?.id));
      setShowConfirmation(true);
      setProductLoaded(false)
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    navigate("/");
  };

  return (
    
    <div className={styles.container} style={{marginTop:"25px"}}>
      <div className= "d-flex align-items-center justify-content-center">
        <div className="card" style={{width: "30rem"}}>
          <h1>Eliminando Producto</h1>
          {productLoaded && (
            <img src={prodById?.image} className="card-img-top" alt="..."/>
          )}
          <div className="card-body">
            <h5 className="card-title">{prodById?.nameProd}</h5>
            <p className="card-text">{prodById?.description}</p>
            <div className="text-center">
              <a onClick={handleDelete} className="btn btn-success" style={{margin:"2px"}}>Confirmar</a>
              <a onClick={handleCancel} className="btn btn-danger" style={{margin:"2px"}}>Cancelar</a>
            </div>
          </div>
        </div>
      </div>
      {showConfirmation && (
        <div className={styles.confirmationModalContainer}>
          <div className={styles.confirmationModalBackdrop}></div>
          <div className={styles.confirmationModal}>
            <p>Producto eliminado con éxito.</p>
            <button onClick={handleConfirmationClose}>Ir a Home</button>
          </div>
        </div>
      )}


      </div>
  );
};

export default DeleteProduct;