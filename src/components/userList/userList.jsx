import React from "react";
import styles from "./userList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function UserList(){
    return(
        <div className="container">
        <h5>Users list:</h5>
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                        <tr>
                        <th className={styles.th} scope="col">Name</th>
                        <th className={styles.th} scope="col">Last Name</th>
                        <th className={styles.th} scope="col">Email</th>
                        <th className={styles.th} scope="col">Type of user</th>
                        <th className={styles.th} scope="col">Status</th>
                        <th className={styles.th} scope="col">Shopping history</th>
                        <th className={styles.th} scope="col">Update</th>
                        <th className={styles.th} scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                            <tr>
                            <td className={styles.td}>Diego</td>
                            <td className={styles.td}>Contreras</td>
                            <td className={styles.td}>contrerasdiegof@gmail.com</td>
                            <td className={styles.td}>
                            <Form.Select aria-label="Seleccionar ejemplo" className='form-select-sm'>
                                <option>Seleccionar...</option>
                                <option value="1">Admin</option>
                                <option value="2">User</option>
                            </Form.Select>
                            </td>
                            <td className={styles.td}>
                            <Form.Select aria-label="Seleccionar ejemplo" className='form-select-sm'>
                                <option>Seleccionar...</option>
                                <option value="1">Active</option>
                                <option value="2">Disabled</option>
                            </Form.Select>
                            </td>
                            <td className={styles.td}><Link>See history</Link></td> 
                            <td className={styles.td}>
                                <button className={styles.button}>
                                <FontAwesomeIcon icon={faPencil} style={{color: "#badb43",}} />
                                </button>
                            </td>
                            <td className={styles.td}>
                                <button className={styles.button}>
                                    <FontAwesomeIcon icon={faTrash} style={{ color: "#dd3636", }} />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
    </div>
)}