import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getDeletedProducts, restoreProducts } from "../../redux/action/actions"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashArrowUp } from '@fortawesome/free-solid-svg-icons';
import PopupGeneral from "../popupGeneral/PopupGeneral";
import styles from './adminModuleRestoreProducts.module.css'

const DeletedProducts = () => {
    const dispatch = useDispatch()
    const deleteProducts = useSelector((state) => state.products.deletedProducts)
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [aux, setAux] = useState(false)
    const [product, setProduct] = useState({
        id: "",
        nameProd: "",
        brand: "",
        price: "",
        CategoryId: "",
        deletedAt: "",
    })

    useEffect(() => {
        dispatch(getDeletedProducts())
    }, [])

    const handleOpenRestore = ({id, nameProd, brand, price, CategoryId, deletedAt}) => {
        setProduct({
            ...product,
            id: id,
            nameProd: nameProd,
            brand: brand,
            price: price,
            CategoryId: CategoryId,
            deletedAt: deletedAt,
        })
        setAux(true)
    }

    const handleRestore = (id) => {
        dispatch(restoreProducts(id))
        setAux(false)
        setProduct({
            id: "",
            name: "",
            lastName: "",
            email: "",
            CountryId: "",
            deletedAt: "",
        })
        setShowConfirmation(true);
    }

    const handleConfirmationClose = () => {
        setShowConfirmation(false);
      };

    const handleCancel = () => {
        setAux(false)
    }

    if(aux === true){
        return (
            <div className="d-flex justify-content-center vh-100">
    <div className="card" style={{ width: "400px", height: "400px" }}>
      <h5 className={styles.Restore}>Are you sure you want to restore this product?</h5>
      <p className={styles.restoreU}>Name: {product?.nameProd}</p>
      <p className={styles.restoreU}>Lastname: {product?.brand}</p>
      <p className={styles.restoreU}>Email: {product?.price}</p>
      <p className={styles.restoreU}>Type product: {product?.CategoryId}</p>
      <p className={styles.restoreU}>Deleted At: {product?.deletedAt}</p>
      <button type="button" className="btn btn-success"  style={{ margin: "2px" }} onClick={() => handleRestore(product?.id)}>Confirm</button>
      <button type="button" className="btn btn-danger"  style={{ margin: "2px" }} onClick={handleCancel}>Cancel</button>
        </div>
    </div>
        )
    }

    if(showConfirmation){
        return (
            <PopupGeneral
              textButton="Aceptar"
              descripcion="Product successfully restored"
              onClick={handleConfirmationClose}
            />
          )
    }

    return (
        <div>
            <h5>Deleted Products:</h5>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="column">Name</th>
                        <th scope="column">Brand</th>
                        <th scope="column">Deleted At</th>
                        <th scope="column">Restore</th>
                    </tr>
                </thead>
                <tbody>
                    {deleteProducts?.map((product) => (
                        <tr key={`deleted${product?.id}`}>
                            <td>{product?.nameProd}</td>
                            <td>{product?.brand}</td>
                            <td>{product?.deletedAt}</td>
                            <td>
                                <button className={styles.button} onClick={() => handleOpenRestore({
                                    id: product?.id,
                                    nameProd: product?.nameProd,
                                    brand: product?.brand,
                                    price: product?.price,
                                    CategoryId: product?.CategoryId,
                                    deletedAt: product?.deletedAt
                                })}>
                                    <FontAwesomeIcon icon={faTrashArrowUp} style={{color: "#1efa00",}} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )
}

export default DeletedProducts