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
        console.error("Error fetching product data:", error);
      }
    };
    fetchData();
  }, [id]);

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
    
    <div className={styles.container}>
      <h1>Eliminando producto</h1>
      {productLoaded && (
        <div>
          <h2>Nombre: {prodById?.nameProd}</h2>
          <h2>Categoría: {prodById?.nameCat}</h2>
          <img src={prodById?.image} alt="" />
          </div>
      )}
      <div>
      <button onClick={handleDelete}>Confirmar</button>
      <button onClick={handleCancel}>Cancelar</button>
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