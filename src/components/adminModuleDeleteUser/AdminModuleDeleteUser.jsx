import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUser, getUserById } from "../../redux/action/actions";

const AdminModuleDeleteUser =() => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const userById = useSelector((state) => state.user) || {};

    const deletedUser = (id) => {
        dispatch(deleteUser(id));
    }

    return (
        <div>
            <h1>Esta seguro que quiere eliminar a este usuario?</h1>
            <button onClick={deletedUser(id)}>Confirmar</button>
        </div>
    )
}
export default AdminModuleDeleteUser