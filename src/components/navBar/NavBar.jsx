import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getProdCategories } from "../../redux/action/actions";
import { typeUser } from "../../redux/action/actions";
import { Link } from "react-router-dom";

const NavBar = ({ onSearch, filterCond }) => {
  const [name, setName] = useState("");
  const {isUser} = useSelector((state) => state)
  const dispatch = useDispatch();
  const prodCategories = useSelector((state) => state.prodCategories) || [];


  const { logout, loginWithRedirect, isAuthenticated } = useAuth0()

  const handleLogin= async() => {
    await loginWithRedirect()
  }

  const handleLogout = async() => {
    await logout({ logoutParams: { returnTo: window.location.origin } })
  }

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
        {isUser === "Admin" ? (
              /* Admin Options */
              <>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Admin
                  </a>
                  <ul className="dropdown-menu dropdown-menu-dark">
                  <li className="nav-item"><a className="nav-link" href="/createProduct">Create Product</a></li>
                  {!isAuthenticated && <li><a className="dropdown-item" onClick={handleLogin}>Login</a></li>}
                  {isAuthenticated && <li><Link to="/profile" className="dropdown-item">My Account</Link></li>}
                  {isAuthenticated && <li><a className="dropdown-item" onClick={handleLogout}>Logout</a></li>}
                  </ul>
                </li>
              </>
             
            ) : isUser === "User" ? (
              /* User Options */
              <>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    User
                  </a>
                  <ul className="dropdown-menu dropdown-menu-dark">
                  {!isAuthenticated && <li><a className="dropdown-item" onClick={handleLogin}>Login</a></li>}
                  {isAuthenticated && <li><Link to="/profile" className="dropdown-item">My Account</Link></li>}
                  {isAuthenticated &&<li><a className="dropdown-item" href="#">My cart</a></li>}
                  {isAuthenticated && <li><a className="dropdown-item" onClick={handleLogout}>Logout</a></li>}
                  </ul>
                </li>
                {/* Add other user-specific options here */}
              </>
            ) : isUser === "Invited" ? (
              /* Invite Options */
              <>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Invite
                  </a>
                  <ul className="dropdown-menu dropdown-menu-dark">
                  {!isAuthenticated && <li><a className="dropdown-item" onClick={handleLogin}>Login</a></li>}
                  {isAuthenticated && <li><a className="dropdown-item" onClick={handleLogout}>Logout</a></li>}
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