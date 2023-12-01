import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./shoppingCart.module.css"

export default function ShoppingCart(){
    const [cantidad, setCantidad] = useState(0);

    const sumar = () => {
      setCantidad(cantidad + 1);
    };
  
    const restar = () => {
      if (cantidad > 0) {
        setCantidad(cantidad - 1);
      }
    };
  
    return(
        
        <div className="container" style={{marginTop: "20px"}}>
            <h1 style={{textAlign:"center", marginBottom:"20px"}}>Shopping Cart</h1>
            <table className="table table-hover">
                <thead>
                    <tr>
                    <th className={styles.th} scope="col">#</th>
                    <th className={styles.th}></th>
                    <th className={styles.th} scope="col">Name</th>
                    <th className={styles.th} scope="col">Price</th>
                    <th className={styles.th} scope="col"></th>
                    <th className={styles.th} scope="col">Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th className={styles.th} scope="row">1</th>
                    <td className={styles.td}><img src="https://acdn.mitiendanube.com/stores/001/474/949/products/223551-fdaddbf6711da206de16325074073443-640-0.png" className="card-img-top" alt="product" style={{width:"100%", height:"80px", objectFit:"contain"}}/></td>
                    <td className={styles.td}>Samunsung TV 40 Pulgadas</td>
                    <td className={styles.td}>$5.000</td>
                    <td className={styles.td}>
                        <div className="container">
                            <div className="btn-group" role="group" aria-label="Botones de Suma y Resta">
                                <button type="button" className="btn btn-light" onClick={restar} style={{marginTop:"-6px"}}>
                                -
                                </button>
                                <div style={{padding:"10px", height:"1px", marginTop:"-10px"}}>
                                    <p>{cantidad}</p>
                                </div>
                                <button type="button" className="btn btn-light" onClick={sumar} style={{marginTop:"-6px"}}>
                                +
                                </button>
                            </div>
                        </div>
                    </td>
                    <td className={styles.td}><button className={styles.button}><FontAwesomeIcon icon={faTrash} style={{ color: "#dd3636", }} />
                            </button></td>
                    </tr>
                    <tr>
                    <th className={styles.th} scope="row">2</th>
                    <td className={styles.td}><img src="https://arcorencasa.com/wp-content/uploads/2023/09/20230904-10374.jpg" className="card-img-top" alt="product" style={{width:"100%", height:"80px", objectFit:"contain"}}/></td>
                    <td className={styles.td}>Chocolate Block</td>
                    <td className={styles.td}>$5</td>
                    <td className={styles.td}>
                        <div className="container">
                            <div className="btn-group" role="group" aria-label="Botones de Suma y Resta">
                                <button type="button" className="btn btn-light" onClick={restar} style={{marginTop:"-6px"}}>
                                -
                                </button>
                                <div style={{padding:"10px", height:"1px", marginTop:"-10px"}}>
                                    <p>{cantidad}</p>
                                </div>
                                <button type="button" className="btn btn-light" onClick={sumar} style={{marginTop:"-6px"}}>
                                +
                                </button>
                            </div>
                        </div>
                    </td>
                    <td className={styles.td}><button className={styles.button}><FontAwesomeIcon icon={faTrash} style={{ color: "#dd3636", }} />
                            </button></td>
                    </tr>
                    <tr>
                    <th className={styles.td} scope="row">3</th>
                    <td className={styles.td}><img src="https://images.fravega.com/f500/937806da60c4940ee2c613372dd051c9.jpg" className="card-img-top" alt="product" style={{width:"100%", height:"80px", objectFit:"contain"}}/></td>
                    <td className={styles.td}>Notebook Lenovo</td>
                    <td className={styles.td}>$900</td>
                    <td className={styles.td}>
                        <div className="container">
                            <div className="btn-group" role="group" aria-label="Botones de Suma y Resta">
                                <button type="button" className="btn btn-light" onClick={restar} style={{marginTop:"-6px"}}>
                                -
                                </button>
                                <div style={{padding:"10px", height:"1px", marginTop:"-10px"}}>
                                    <p>{cantidad}</p>
                                </div>
                                <button type="button" className="btn btn-light" onClick={sumar} style={{marginTop:"-6px"}}>
                                +
                                </button>
                            </div>
                        </div>
                    </td>
                    <td className={styles.td}><button className={styles.button}><FontAwesomeIcon icon={faTrash} style={{ color: "#dd3636", }} />
                            </button></td>
                    </tr>
                </tbody>
            </table>
            <div className="d-grid gap-2">
                <button className="btn btn-primary" type="button">Confirm</button>
            </div>
        </div>

    );
}
