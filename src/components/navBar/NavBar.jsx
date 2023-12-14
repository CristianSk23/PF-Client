import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { getProdCategories, logOut } from "../../redux/action/actions";
import { Link } from "react-router-dom";
import logoImage from "../../assets/Logo.png";

const NavBar = ({ onSearch, filterCond, onNavBarHeightChange }) => {
  const [name, setName] = useState("");
  const isUser = useSelector((state) => state.isUser);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const prodCategories = useSelector((state) => state.prodCategories) || [];
  const [height, setHeight] = useState(0);
  const isLandingPage = location.pathname === '/';
  const navBarRef = useRef(null);

  const { logout, loginWithRedirect, isAuthenticated } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect();
  };

  const handleLogout = async () => {
    try {
      await logout({ logoutParams: { returnTo: window.location.origin } });
      dispatch(logOut());
    } catch (error) {
      // console.error('Error during logout:', error);
    }
  };

  useEffect(() => {
    if (prodCategories.length === 0) {
      dispatch(getProdCategories());
    }
  }, [dispatch, prodCategories.length]);

  useEffect(() => {
    // Llamada a la función cuando cambia la altura del NavBar
    onNavBarHeightChange && onNavBarHeightChange(height);
  }, [height, onNavBarHeightChange]);

  useEffect(() => {
    // Obtener la altura del NavBar al montar el componente
    getNavBarHeight();
    // Escuchar cambios de tamaño de la ventana para actualizar la altura si es necesario
    const handleResize = () => getNavBarHeight();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Solo se ejecuta al montar y desmontar el componente

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const clearSearch = () => {
    // Limpiar el campo de búsqueda
    setName('');
  };

  const getNavBarHeight = () => {
    if (navBarRef.current) {
      const height = navBarRef.current.clientHeight;
      // Actualizar el estado con la altura actual del NavBar
      setHeight(height);
    }
  };

  return (
    <nav className="navbar navbar-dark bg-dark fixed-top" ref={navBarRef}>
    <div className="container-fluid" >
      <a className="navbar-brand" href="/">
      <img
        src={logoImage}
        alt="Logo"
        width="130"
        height="auto"
        className="d-inline-block align-top"
        style={{marginTop:"-8px"}}
      />
      </a>
      {isLandingPage && (
      <div className="d-flex align-items-center">
      <div className="d-flex mx-auto" role="search">
          <input id="search" value={name} className="form-control me-2" type="search" placeholder="Product name..." aria-label="Search" onChange={handleChange}/>
          <button className="btn btn-outline-light" disabled={name == ""} onClick={() => {
          onSearch(name);
          clearSearch();
        }}>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
          />
          </button>
      </div>
      </div>
      )}

        <div className="d-flex align-items-center">
        { isUser === "User" && (
          <Link to="/shopping" style={{textDecoration: 'none', color: 'inherit'}}>
          <button className="btn btn-outline-light" style={{marginRight:"5px"}}>
            <FontAwesomeIcon icon={faShoppingCart} />
          </button>
          </Link>
        )}

          <button className="navbar-toggler me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation" >
            <span className="navbar-toggler-icon" ></span>
          </button>
        </div>
      <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Options</h5>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
        {isUser === "Admin" ? (
              /* Admin Options */
              <>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Hola {user.email}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-dark">
                  {!isAuthenticated && <li><a className="dropdown-item" onClick={handleLogin}>Login</a></li>}
                  {isAuthenticated && <li><a href="/adminPanel" className="dropdown-item">Administration Panel</a></li>}
                  {isAuthenticated && <li><a href="/myProfile" className="dropdown-item" >My Account</a></li>}
                  {isAuthenticated && <li><a className="dropdown-item" onClick={handleLogout}>Logout</a></li>}
                  </ul>
                </li>
              </>
             
            ) : isUser === "User" ? (
              /* User Options */
              <>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Hola {user.email}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-dark">
                  {!isAuthenticated && <li><a className="dropdown-item" onClick={handleLogin}>Login</a></li>}
                  {isAuthenticated && <li><a href="/myProfile" className="dropdown-item">My Account</a></li>}
                  {isAuthenticated && <li><a className="dropdown-item" onClick={handleLogout}>Logout</a></li>}
                  </ul>
                </li>
                {/* Add other user-specific options here */}
              </>
            ) : isUser === "Invited" ? (
              /* Invite Options */
              <>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Guest User
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