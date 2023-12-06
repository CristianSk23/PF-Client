import React from "react";
import styles from "./orderList.module.css";
import { Link } from "react-router-dom";

export default function OrderList(){
    return(
        <div>
            {/* VER SI VAMOS A USAR UNA ORDEN DETALLADA Y AGREGAR UN BOTON MAS EN LA TABLA EN CASO DE QUE SEA ASI */}
        <h5>Orders list:</h5>
        <table className="table table-hover">
            <thead>
                <tr>
                <th className={styles.th} scope="col">ID Order</th>
                <th className={styles.th} scope="col">Order Date</th>
                <th className={styles.th} scope="col">User ID</th>
                <th className={styles.th} scope="col">Mercado Pago Status</th>
                <th className={styles.th} scope="col">Delivery Status</th>
                <th className={styles.th} scope="col">Total Amount</th>
                <th className={styles.th} scope="col">Order</th>
                </tr>
            </thead>
            <tbody>
                    <tr>
                    <td className={styles.td}>12345</td>
                    {/* En products ponemos el nombre y dentro del strong la cantidad vendida para asi es mas facil de mostrar */}
                    <td className={styles.td}>2023-12-05</td>
                    <td className={styles.td}>21</td>
                    <td className={styles.td}>Approved</td>
                    <td className={styles.td}>In Process</td>
                    <td className={styles.td}>$25000</td>
                    <td className={styles.td}><Link>See detail</Link></td>
                </tr>
            </tbody>
        </table>
    </div>
    )
}