import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getDeletedUsers, restoreDeleteUsers } from "../../redux/action/actions"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonWalkingArrowLoopLeft } from '@fortawesome/free-solid-svg-icons';
import PopupGeneral from "../popupGeneral/PopupGeneral";
import styles from './adminModuleRestoreDeletedUsers.module.css'

const DeletedUsers = () => {
    const dispatch = useDispatch()
    const deleteUsers = useSelector((state) => state.deletedUsers)
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [aux, setAux] = useState(false)
    const [user, setUser] = useState({
        id: "",
        name: "",
        lastName: "",
        email: "",
        CountryId: "",
        deletedAt: ""
    })

    useEffect(() => {
        dispatch(getDeletedUsers())
    }, [])

    const handleOpenRestore = ({id, name, lastName, email, typeUser, deletedAt}) => {
        setUser({
            ...user,
            id: id,
            name: name,
            lastName: lastName,
            email: email,
            typeUser: typeUser,
            deletedAt: deletedAt
        })
        setAux(true)
    }

    const handleRestore = (id) => {
        dispatch(restoreDeleteUsers(id))
        setAux(false)
        setUser({
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
      <h5 className={styles.Restore}>Are you sure you want to restore this user?</h5>
      <p className={styles.restoreU}><strong>Name:</strong> {user?.name}</p>
      <p className={styles.restoreU}><strong>Last Name:</strong> {user?.lastName}</p>
      <p className={styles.restoreU}><strong>Email:</strong> {user?.email}</p>
      <p className={styles.restoreU}><strong>Type User:</strong> {user?.typeUser}</p>
      <p className={styles.restoreU}><strong>Deleted At:</strong> {user?.deletedAt}</p>
      <button type="button" className="btn btn-success"  style={{ margin: "2px" }} onClick={() => handleRestore(user?.id)}>Confirm</button>
      <button type="button" className="btn btn-danger"  style={{ margin: "2px" }} onClick={handleCancel}>Cancel</button>
        </div>
    </div>
        )
    }

    if(showConfirmation){
        return (
            <PopupGeneral
              textButton="Aceptar"
              descripcion="User successfully restored"
              onClick={handleConfirmationClose}
            />
          )
    }

    return (
        <div className="container">
            <h5>Deleted Users:</h5>
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th className={styles.th} scope="column">Name</th>
                            <th className={styles.th} scope="column">Email</th>
                            <th className={styles.th} scope="column">Type user</th>
                            <th className={styles.th} scope="column">CountryId</th>
                            <th className={styles.th} scope="column">Deleted At</th>
                            <th className={styles.th} scope="column">Restore</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deleteUsers?.map((user) => (
                            <tr key={`deleted${user.id}`}>
                                <td className={styles.td}>{user.name}</td>
                                <td className={styles.td}>{user.email}</td>
                                <td className={styles.td}>{user.typeUser}</td>
                                <td className={styles.td}>{user.CountryId}</td>
                                <td className={styles.td}>{user.deletedAt}</td>
                                <td className={styles.td}>
                                    <button className={styles.button} onClick={() => handleOpenRestore({
                                        id: user?.id,
                                        name: user?.name,
                                        email: user?.email,
                                        lastName: user?.lastName,
                                        typeUser: user?.typeUser,
                                        deletedAt: user?.deletedAt
                                    })}>
                                    <FontAwesomeIcon icon={faPersonWalkingArrowLoopLeft} style={{color: "#1efa00",}} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DeletedUsers