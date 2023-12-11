import React from "react";
import styles from "./listProducts.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { Form } from 'react-bootstrap';
import FilterAndOrder from "../filterAndOrder/FilterAndOrder";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { getAllProducts, changePage, increaseStock, decreaseStock, deleteProduct } from "../../redux/action/actions";
import {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom";
import Cards from "../cards/Cards"
import { Link } from "react-router-dom";

export default function ListProducts(){

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllProducts());
      }, [dispatch]);

    const products = useSelector((state) => state.products?.data)

    const [filterCond, setFilterCond] = useState({
        type: "all",
        price: "all",
        order: "ascendent",
      });
    const [aux, setAux] = useState(false);
    const [prev, setPrev] = useState(true)  

    const pagination = (event) => {
        dispatch(changePage(event.target.name));
      };

    const reset = (event) => {
        dispatch(getAllProducts());
        const selectElements = document.querySelectorAll("select");
        selectElements.forEach((select) => {
          select.value = "all";
        });
    };  

    const handleCancel = () => {
        navigate(-1);
      };

    const handlePreview = () => {
        setPrev(false)
    }

    const handleClosePrev = () => {
        setPrev(true)
    }

    const IncreaseSTOCK = (id) => {
        dispatch(increaseStock(id))
     }
    
     const DecreaseSTOCK = (id) => {
        dispatch(decreaseStock(id))
     }

     const DeletePRODUCT = (id, name) => {
        const prodToDelete =  confirm(`Are you sure you want to delete the following product: ${name}`)
        if(prodToDelete){
        dispatch(deleteProduct(id))
        }    
    }

    return(
        <div>

        <h5 style={{marginBottom:"-95px"}}>List of Products:</h5>

        <FilterAndOrder
        setFilterCond={setFilterCond}
        filterCond={filterCond}
        setAux={setAux}
        />

        <div className="pagination justify-content-center">
        <button 
        type="button" 
        className="form-control" 
        style={{ width: '50px', textAlign:"center", marginTop:"5px", height:"37.6px"}}
        onClick={reset}
        >
        <FontAwesomeIcon icon={faArrowsRotate} />
        </button>
        </div>

        {prev ? (
        <div> 

            <div style={{"text-align": "right"}}>
                <button
                style={{
                color: "white",
                padding: "10px 15px",
                border: "none",
                cursor: "pointer",
                "border-radius": "5px",
                "background-color": "limegreen"}}
                onClick={handlePreview}
                >
                    Preview User View
                </button>
            </div>

                <table className="table table-hover" style={{marginTop:"10px"}}>
                    <thead>
                        <tr>
                        <th className={styles.th} scope="col">Image</th>
                        <th className={styles.th} scope="col">Name</th>
                        <th className={styles.th} scope="col">Category</th>
                        <th className={styles.th} scope="col">Price</th>
                        <th className={styles.th} scope="col">Stock</th>
                        <th className={styles.th} scope="col">Average Review</th>
                        <th className={styles.th} scope="col">Status</th>
                        <th className={styles.th} scope="col">Update</th>
                        <th className={styles.th} scope="col">Delete</th>
                        </tr>
                    </thead>    
                    <tbody>

                        {products.map((product) => (
                            <tr>
                            <img className={styles.td} style={{ width: '50px', height: '50px' }}  src={product.image[0]} alt={product.nameProd} />
                            <td className={styles.td}>{product.nameProd}</td>
                            <td className={styles.td}>{product.category}</td>
                            <td className={styles.td}>{product.price}</td>  
                            <td className={styles.td}>
                            <div className="container">{/*A PEDIDO DE DIEGO Z PUSE BOTONES PARA MANEJAR EL STOCK DIRECTAMENTE DE ACA, FALTA DARLE EL FUNCIONAMIENTO
                            COMO LO TIENE EN EL CARRITO DE COMPRAS, SI SE COMPLICA USAR SOLO EL UPDATE */}
                                <div className="btn-group" role="group" aria-label="Botones de Suma y Resta">
                                    <button type="button" onClick={()=> DecreaseSTOCK(product.id)} className="btn btn-primary" style={{marginTop:"-6px"}}>
                                    -
                                    </button>
                                    <div style={{padding:"10px", height:"1px", marginTop:"-9px"}}>
                                        <p>{product.stock}</p>
                                    </div>
                                    <button type="button" onClick={() => IncreaseSTOCK(product.id)} className="btn btn-primary"style={{marginTop:"-6px"}}>
                                    +
                                    </button>
                                </div>
                            </div>
                            </td>
                            <td className={styles.td}>4.5</td>
                            <td className={styles.td}>
                            <Form.Select aria-label="Seleccionar ejemplo" className='form-select-sm'>
                                <option>Seleccionar...</option>
                                <option value="1">Active</option>
                                <option value="2">Disabled</option>
                            </Form.Select>
                            </td>
                            <td className={styles.td}>
                                <Link to={`/updateProduct/${product.id}`}>
                                <button className={styles.button}>
                                <FontAwesomeIcon icon={faPencil} style={{color: "#badb43",}} />
                                </button>
                                </Link>
                            </td>
                            <td className={styles.td}> {/* DARLE FUNCIONAMIENTO AL BOTON DE DELETE */}
                                <button onClick={()=>DeletePRODUCT(product.id, product.nameProd)} className={styles.button}>
                                    <FontAwesomeIcon icon={faTrash} style={{ color: "#dd3636", }} />
                                </button>
                            </td>
                        </tr>
                        ))}

                        </tbody>
                        </table>
     
                </div>  
                    ) : (
                <div>
                <div style={{"text-align":"right"}}>
                <button 
                style={{
                    color: "white",
                    padding: "10px 15px",
                    border: "none",
                    cursor: "pointer",
                    "border-radius": "5px",
                    "background-color": "orange"}}
                onClick={handleClosePrev}        
                >Close User View</button>
                </div>                    
                <Cards products={products}/>             
                </div>
                )}

                <nav aria-label="Page navigation example" style={{ marginTop: "22px" }}>
                   <ul className="pagination justify-content-center">
                    <li className="page-item">
                        <a
                        className="page-link"
                        onClick={pagination}
                        name="prev"
                        style={{ cursor: "default" }}
                        >
                        {"<<"} Previous
                        </a>
                    </li>
                    <li className="page-item">
                        <a
                        className="page-link"
                        onClick={pagination}
                        name="next"
                        style={{ cursor: "default" }}
                        >
                        Next {">>"}
                        </a>
                    </li>
                    </ul>
                </nav>    

                <a
                    onClick={handleCancel}
                    className="btn btn-primary"
                    style={{ bottom: "10px", right: "10px" }}
                    >
                    Back
                </a>
                </div>
    )
}