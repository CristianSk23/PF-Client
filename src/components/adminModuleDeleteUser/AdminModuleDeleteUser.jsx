import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUserById } from "../../redux/action/actions";
import { useState, useEffect } from "react";
import PopupGeneral from "../popupGeneral/PopupGeneral";
import { useAuth0 } from "@auth0/auth0-react";
import ErrorView from "../error404/Error404";
import styles from "./adminModuleDeleteUser.module.css"

const AdminModuleDeleteUser = () => {
  const { id } = useParams();
  const isUser = useSelector((state) => state.isUser)
  const {isAuthenticated, isLoading} = useAuth0()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const userById = useSelector((state) => state.user) || {};
  const [user, setUser] = useState({
    id: '',
    name: '',
    lastName: '',
    email: '',
    address: '',
    phone: '',
    identityCard: '',
    postalCode: '',
    city: '',
    active: '',
    typeUser: '',
    country: '',
  })

  const deletedUser = () => {
    dispatch(deleteUser(id));
    setShowConfirmation(true);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    navigate(-1);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getUserById(id));

    return () => {
        setUser({
          id: '',
          name: '',
          lastName: '',
          email: '',
          address: '',
          phone: '',
          identityCard: '',
          postalCode: '',
          city: '',
          active: '',
          typeUser: '',
          country: '',
        });
      };
    }, [dispatch]);

  useEffect(() => {
    setUser({
        id: userById.id || "",
        name: userById.name || "",
        lastName: userById.lastName || "",
        email: userById.email || "",
        address: userById.address || "",
        phone: userById.phone || "",
        identityCard: userById.identityCard || "",
        postalCode: userById.postalCode || "",
        city: userById.city || "",
        active: userById.active || "",
        typeUser: userById.typeUser || "",
        country: userById.country || ""
    })
  }, [userById])

  if (!isLoading && (!isAuthenticated && isUser !== "Admin")) {
    return (
      <div>
        <ErrorView />
      </div>
    );
  }
  console.log(isUser);


  return (!isLoading &&
    <div className={styles.containerDelete}>
    <div className="card" style={{ width: "400px", height: "360px" }}>
      <h5 className={styles.deleteT}>Are you sure you want to delete this user?</h5>
      <p className={styles.deleteP}><strong>Name:</strong> {user.name}</p>
      <p className={styles.deleteP}><strong>Last Name:</strong> {user.lastName}</p>
      <p className={styles.deleteP}><strong>Email:</strong> {user.email}</p>
      <p className={styles.deleteP}><strong>Type User:</strong> {user.typeUser}</p>
      <button type="button" className="btn btn-success"  style={{ margin: "2px" }} onClick={deletedUser}>Confirm</button>
      <button type="button" className="btn btn-danger"  style={{ margin: "2px" }} onClick={handleCancel}>Cancel</button>
      {showConfirmation && (
        <PopupGeneral
          textButton="Aceptar"
          descripcion="User successfully deleted"
          onClick={handleConfirmationClose}
        />
      )}
        </div>
    </div>
  );
};
export default AdminModuleDeleteUser;
