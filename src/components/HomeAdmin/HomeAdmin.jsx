import React from "react";
import LineGraph from "../LineGraph/LineGraph";
import styles from "./homeAdmin.module.css"

export default function HomeAdmin(){
    return(
    <div>
        <h5>Texto sobre el grafico que mostramos en el home</h5>
        <LineGraph />

        <hr/>

        <h5 style={{marginTop:"25px"}}>Texto sobre la tabla que vamos a mostrar:</h5>
        <table className="table table-hover">
            <thead>
                <tr>
                <th className={styles.th} scope="col">DATO 1</th>
                <th className={styles.th} scope="col">DATO 2</th>
                <th className={styles.th} scope="col">DATO 3</th>
                <th className={styles.th} scope="col">DATO 4</th>
                <th className={styles.th} scope="col">DATO 5</th>
                </tr>
            </thead>
            <tbody>
                    <tr>
                    <td className={styles.td}>INFO 1</td>
                    <td className={styles.td}>INFO 2</td>
                    <td className={styles.td}>INFO 3</td>
                    <td className={styles.td}>INFO 4</td>
                    <td className={styles.td}>INFO 5</td>
                    </tr>
                    <tr>
                    <td className={styles.td}>INFO 1</td>
                    <td className={styles.td}>INFO 2</td>
                    <td className={styles.td}>INFO 3</td>
                    <td className={styles.td}>INFO 4</td>
                    <td className={styles.td}>INFO 5</td>
                    </tr>
                    <tr>
                    <td className={styles.td}>INFO 1</td>
                    <td className={styles.td}>INFO 2</td>
                    <td className={styles.td}>INFO 3</td>
                    <td className={styles.td}>INFO 4</td>
                    <td className={styles.td}>INFO 5</td>
                    </tr>
            </tbody>
        </table>
    </div>
    )
}