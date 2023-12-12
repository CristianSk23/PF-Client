// Importar los módulos necesarios de React y Bootstrap
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import styles from './adminPanel.module.css';
import CreateProduct from '../createProduct/CreateProduct';
import { Dropdown } from 'react-bootstrap';
import NavBar from '../navBar/NavBar';
import BarGraphics from '../BarGraphic/BarGraphic';
import { useDispatch, useSelector } from 'react-redux';
import { setPageAdmin } from '../../redux/action/actions';
import LineGraph from '../LineGraph/LineGraph';
import PieChart from '../PieChart/PieChart';
import OrderList from '../orderList/orderList';
import AdminModuleUser from '../adminModuleUser/AdminModuleUser';
import ListProducts from '../ListProducts/listProducts';
import HomeAdmin from '../HomeAdmin/HomeAdmin';
import DeletedUsers from '../adminModuleRestoreDeletedUsers/AdminModuleRestoreDeletedUsers';
import DeletedProducts from '../adminModuleRestoreProduct/AdminModuleRestoreProduct';
import SalesByCategory from "../kpis/salesByCategory/SalesByCategory";
import SalesHistory from '../kpis/salesHistory/salesHistory';
<<<<<<< HEAD
import {useAuth0} from '@auth0/auth0-react'
import ErrorView from '../error404/Error404';
=======
import Footer from '../Footer/Footer';
>>>>>>> develop

//ENLAZAR A QUE AHORA ESTO SEA LA "LANDING" DEL ADMIN

export default function AdminPanel() {
    const dispatch = useDispatch()
    const pageAdmin = useSelector((state) => state.pageAdmin);
    const initialActiveButton = pageAdmin || 'dassboard';
    const [activeButton, setActiveButton] = useState(initialActiveButton);
    const [shouldRender, setShouldRender] = useState(true);
    const {isAuthenticated, isLoading} = useAuth0()
    const typeUser = useSelector((state) => state.user.typeUser) 

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName)
        dispatch(setPageAdmin(buttonName))
      };

      useEffect(() => {
        const timeoutId = setTimeout(() => {
          if(typeUser === "Invited") {setShouldRender(false)}else{
          setShouldRender(typeUser === "Admin")};
        }, 250);
      
        return () => clearTimeout(timeoutId);
      }, [typeUser]);

    const renderContent = () => {
        switch (activeButton) {
          case 'home':
            return (
              <div>
                <HomeAdmin />
              </div>
            );
          case 'create':
            return (
              <div style={{marginTop:"-60px"}}>
                <CreateProduct />
              </div>
            );
          case 'products':
            return (
              <div>
                <ListProducts />
              </div>
            );
          case 'deletedProducts':
            return (
              <div>
                <DeletedProducts/>
              </div>
            )
          case 'users':
            return (
            <div>
                <AdminModuleUser />
              </div>
            );
          case 'deletedUsers':
            return (
              <div>
                <DeletedUsers />
              </div>
            )
            case 'saleHistorial':
                return (
                  <div>
                    <h2>Sales</h2>
                    <SalesHistory />
                  </div>
                );
            case 'saleByCategory':
                return (
                  <div>
                    <h2>Ejemplo de grafico lineal</h2>
                    <SalesByCategory />
                  </div>
                );
            case 'signout':
                return (
                    <div>
                        <h2>DARLE FUNCIONAMIENTO PARA QUE CIERRE SESION Y SI NO LO QUIEREN LO SACAMOS</h2>
                    </div>
                );
            
            case 'reviews':
                return (
                    <div>
                        <h2>NO QUEDO CLARO SI ESTO VA A SER UNA TABLA MAS CON LAS REVIEWS DE CADA UNO O SI LAS VAMOS A MOSTRAR EN LA TABLA DE USERS</h2>
                        <h2>EN CASO DE QUE SEA UNA TABLA LA AGREGO</h2>
                    </div>
                );
            case 'orders':
                return (
                    <div>
                      <OrderList />
                  </div>
                );
            case 'saleCategory': {/* VER QUE GRAFICOS VAMOS A USAR EN CADA CASE PORQUE VA A SER NECESARIO CREAR UN COMPONENTE PARA CADA UNO */}
                return (
                    <div>
                        <h2>Sales by Category</h2>
                        <SalesByCategory />
                    </div>
                );
            case 'saleUser':
                return (
                    <div>
                        <h2>Ejemplo de grafico pastel</h2>

                    </div>
                );
            case 'saleOvertime':
                return (
                    <div>
                        <h2>Contenido sale overtime</h2>
                    </div>
                );
            //AGREGAR CASES DE UPDATE Y DELETE
          default:
            return (
              <div>
                <HomeAdmin />
              </div>
            );
        }
      };

  if(shouldRender){
  return (  
    <div>
      <NavBar />
      {/* Sidebar */}
      <div className="container-fluid" style={{marginTop:"48px"}}>
        <div className="row">
          <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block bg-light sidebar"
            style={{ minHeight: "100vh" }}
          >
            <div className="position-sticky">
              <ul className="nav flex-column" style={{marginTop:"15px"}}>
              <li className={`nav-item ${activeButton === 'home' ? 'active' : ''}`}>
                  <a className="nav-link" href="#" onClick={() => handleButtonClick('home')}>
                  <i className="bi bi-house-door"></i> Home
                  </a>
                </li>
                <li className={`nav-item ${activeButton === 'orders' ? 'active' : ''}`}>
                  <a className="nav-link" href="#" onClick={() => handleButtonClick('orders')}>
                  <i className="bi bi-file-earmark"></i> Orders
                  </a>
                </li>
                <li className={`nav-item ${activeButton === 'products' ? 'active' : ''}`}>
                    <Dropdown>
                        <Dropdown.Toggle variant="light" id="dropdown-basic" className="custom-dropdown-toggle" style={{color:"#0d6efd", marginLeft:"3px"}}>
                        <i className="bi bi-cart"></i>&nbsp;Products
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleButtonClick('products')}>List of Products</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleButtonClick('create')}>Create Product</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleButtonClick('deletedProducts')}>Deleted Products</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
                <li className={`nav-item ${activeButton === 'users' ? 'active' : ''}`}>
                    <Dropdown>
                        <Dropdown.Toggle variant="light" id="dropdown-basic" className="nav-link" style={{color:"#0d6efd", marginLeft:"3px"}}>
                        <i className="bi bi-people"></i>&nbsp;Users
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                        <Dropdown.Item href="#" onClick={() => handleButtonClick('users')}>Users</Dropdown.Item>
                        <Dropdown.Item href="#" onClick={() => handleButtonClick('deletedUsers')}>Deleted Users</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
                <li className={`nav-item ${activeButton === 'historial' ? 'active' : ''}`}>
                    <Dropdown>
                        <Dropdown.Toggle variant="light" id="dropdown-basic" className="custom-dropdown-toggle" style={{color:"#0d6efd", marginLeft:"3px"}}>
                        <i className="bi bi-graph-up"></i>&nbsp;KPI
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => handleButtonClick('saleHistorial')}>Sales History</Dropdown.Item>
                          <Dropdown.Item onClick={() => handleButtonClick('saleCategory')}>Sales by Category</Dropdown.Item>
                          <Dropdown.Item onClick={() => handleButtonClick('saleUser')}>Sales by User</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
              </ul>
              <hr className="my-3"/>
              <ul className="nav flex-column mb-auto">
                <li className={`nav-item ${activeButton === 'signout' ? 'active' : ''}`}>
                    <a className="nav-link" href="#" onClick={() => handleButtonClick('signout')}>
                    <i className="bi bi-door-closed"></i> Sign Out
                    </a>
                </li>
                </ul>
            </div>
          </nav>

          {/* Main content */}
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Admin Panel</h1>
            </div>

            <div className="row">
                <div className="col-md-12"> 
                    {renderContent()}
                </div>
            </div>
            <Footer />
          </main>
        </div>
      </div>
    </div>)} else {
      return(
        <div>
          <ErrorView/>
        </div>
      )
    }
}
  