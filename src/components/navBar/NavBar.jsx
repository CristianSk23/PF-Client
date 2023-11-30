import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getProdCategories } from "../../redux/action/actions";
import { UserType } from "../../utils/userType";

const NavBar = ({ onSearch, filterCond }) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const prodCategories = useSelector((state) => state.prodCategories) || [];
  const isUser = UserType.ADMIN

  useEffect(() => {
    if (prodCategories.length === 0) {
      dispatch(getProdCategories());
    }
  }, []);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <nav className="navbar navbar-dark bg-dark fixed-top">
    <div className="container-fluid">
      <a className="navbar-brand" href="/">Logo</a>
      <div className="d-flex" role="search">
          <input id="search" value={name} className="form-control me-2" type="search" placeholder="Product name..." aria-label="Search" onChange={handleChange}/>
          <button className="btn btn-outline-light" disabled={name == ""} onClick={() => onSearch(name)}>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
          />
          </button>
      </div>
      <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Options</h5>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
        <ul>
        {isUser === UserType.ADMIN ? (
              /* Admin Options */
              <>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Admin
                  </a>
                  <ul className="dropdown-menu dropdown-menu-dark">
                  <li className="nav-item"><a className="nav-link" href="/createProduct">Create Product</a></li>
                  <li className="nav-item"><a className="nav-link" href="">Logout</a></li>
                  </ul>
                </li>
              </>
             
            ) : isUser === UserType.USER ? (
              /* User Options */
              <>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    User
                  </a>
                  <ul className="dropdown-menu dropdown-menu-dark">
                    <li><a className="dropdown-item" href="#">My account</a></li>
                    <li><a className="dropdown-item" href="#">My cart</a></li>
                    <li><a className="dropdown-item" href="#">Logout</a></li>
                  </ul>
                </li>
                {/* Add other user-specific options here */}
              </>
            ) : isUser === UserType.INVITE ? (
              /* Invite Options */
              <>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Invite
                  </a>
                  <ul className="dropdown-menu dropdown-menu-dark">
                    <li><a className="dropdown-item" href="/login">Login</a></li>
                    <li><a className="dropdown-item" href="#">Register</a></li>
                  </ul>
                </li>
              </>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
    </nav>
);
};

export default NavBar;