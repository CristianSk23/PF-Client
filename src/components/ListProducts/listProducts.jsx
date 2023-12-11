import React from "react";
import styles from "./listProducts.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { Form } from 'react-bootstrap';
import FilterAndOrder from "../filterAndOrder/FilterAndOrder";

export default function ListProducts(){
    return(
        <div>
            <h5 style={{marginBottom:"-55px"}}>List of Products:</h5>

            <FilterAndOrder/>
                {/* FALTA TRAER EL BOTON DE RESETEAR LOS FILTROS Y SU FUNCIONABILIDAD */}
                <table className="table table-hover" style={{marginTop:"10px"}}>
                    <thead>
                        <tr>
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
                            <tr>
                            <td className={styles.td}>TV Samsung 29 Pulgadas</td>
                            <td className={styles.td}>TV</td>
                            <td className={styles.td}>$1500</td>  
                            <td className={styles.td}>
                            <div className="container">{/*A PEDIDO DE DIEGO Z PUSE BOTONES PARA MANEJAR EL STOCK DIRECTAMENTE DE ACA, FALTA DARLE EL FUNCIONAMIENTO
                            COMO LO TIENE EN EL CARRITO DE COMPRAS, SI SE COMPLICA USAR SOLO EL UPDATE */}
                                <div className="btn-group" role="group" aria-label="Botones de Suma y Resta">
                                    <button type="button" className="btn btn-primary" style={{marginTop:"-6px"}}>
                                    -
                                    </button>
                                    <div style={{padding:"10px", height:"1px", marginTop:"-9px"}}>
                                        <p>10</p>
                                    </div>
                                    <button type="button" className="btn btn-primary"style={{marginTop:"-6px"}}>
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
                            <td className={styles.td}> {/* DARLE FUNCIONAMIENTO AL BOTON DE UPDATE */}
                                <button className={styles.button}>
                                <FontAwesomeIcon icon={faPencil} style={{color: "#badb43",}} />
                                </button>
                            </td>
                            <td className={styles.td}> {/* DARLE FUNCIONAMIENTO AL BOTON DE DELETE */}
                                <button className={styles.button}>
                                    <FontAwesomeIcon icon={faTrash} style={{ color: "#dd3636", }} />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table> 
        </div>
    )
}