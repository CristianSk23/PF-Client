import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getDeletedUsers, restoreDeleteUsers } from "../../redux/action/actions"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonWalkingArrowLoopLeft } from '@fortawesome/free-solid-svg-icons';

const DeletedUsers = () => {
    const disptach = useDispatch()
    const deleteUsers = useSelector((state) => state.deletedUsers)

    useEffect(() => {
        disptach(getDeletedUsers())
    }, [])

    const handleRestore = (id) => {
        disptach(restoreDeleteUsers(id))
    }

    return (
        <div>
            <h5>Deleted Users:</h5>
            <table>
                <thead>
                    <tr>
                        <th scope="column">Name</th>
                        <th scope="column">Email</th>
                        <th scope="column">Type user</th>
                        <th scope="column">Deleted At</th>
                        <th scope="column">Restore</th>
                    </tr>
                </thead>
                <tbody>
                    {deleteUsers?.map((user) => (
                        <tr key={`deleted${user.id}`}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.typeUser}</td>
                            <td>{user.deletedAt}</td>
                            <td>
                                <button onClick={() => handleRestore(user?.id)}>
                                <FontAwesomeIcon icon={faPersonWalkingArrowLoopLeft} style={{color: "#1efa00",}} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )
}

export default DeletedUsers