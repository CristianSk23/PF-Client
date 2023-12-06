import { useParams } from "react-router-dom";

const AdminModuleDeleteUser =() => {
    const { id } = useParams();
    return (
        <div>
            <h1>Esta seguro que quiere eliminar a este usuario?</h1>
            <h2>{id}</h2>
        </div>
    )
}
export default AdminModuleDeleteUser