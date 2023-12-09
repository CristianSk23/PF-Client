import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getDeletedProducts, restoreProducts } from "../../redux/action/actions"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashArrowUp } from '@fortawesome/free-solid-svg-icons';

const DeletedProducts = () => {
    const disptach = useDispatch()
    const deleteProducts = useSelector((state) => state.products.deletedProducts)

    useEffect(() => {
        disptach(getDeletedProducts())
    }, [])

    const handleRestore = (id) => {
        disptach(restoreProducts(id))
    }

    return (
        <div>
            <h5>Deleted Products:</h5>
            <table>
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
                                <button onClick={() => handleRestore(product?.id)}>
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