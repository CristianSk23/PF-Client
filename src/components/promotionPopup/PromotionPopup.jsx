import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showThePopup } from "../../redux/action/actions";
import { useEffect } from "react";
import { typeUser } from "../../redux/action/actions";

import styles from "./promotionPopup.module.css";
import { useAuth0 } from "@auth0/auth0-react";

const PromotionPopup = () => {
  const dispatch = useDispatch();

  const {isAuthenticated} = useAuth0()
  const showPopup = useSelector((state) => state.isShowPopup);
  const [currentImage, setCurrentImage] = useState(0); // para el slider, cambiar por la libreria que se use
  const isUser = useSelector((state) => state.isUser)
  const typeUser = useSelector((state) => state.user.typeUser)

  const closetPopup = () => {
    dispatch(showThePopup(false));
  };

  //Cambiar una vez se defina la libreria para el diseño
  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };
  //Cambiar una vez se defina la libreria para el diseño
  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };
  // Actualmente solo envio 3 imagenes defu=inir cuales productos se van a mostrar aqui
  const images = [
    "https://ingenieriademenu.com/wp-content/uploads/2022/05/Cuales-son-las-frutas-y-cuales-son-las-verduras.jpg",
    "https://equipment21.com/wp-content/uploads/productos-que-venden-las-tiendas-de-abarrotes.jpg",
    "https://static.eldiario.es/clip/d210311d-65b7-4359-ae7a-11bf2ef96f22_16-9-discover-aspect-ratio_default_0.jpg",
  ];


  //SI VAMOS A TRAER IMAGENES Y PROMOCIONES REALES MAPEAR DENTRO DEL DIV QUE TIENE EL CLASSNAME "carousel-item" Y SI VAN A SER MAS DE 3 IMAGENES DEBEMOS 
  //MANEJAR LOS BOTONES DE LA CLASE "carousel-indicators"

  return (!typeUser || isUser === "Invited" || isUser === "User") &&
  typeUser === isUser &&
  showPopup && ( <div className={styles.popup}>
    <div className={styles["poput-content"]}>
      <div id="carouselExampleDark" className={`carousel carousel-dark slide ${styles["carousel-fade"]}`} data-bs-ride="carousel" data-bs-interval="5000" data-bs-pause="hover">
        <button type="button" className={`btn-close ${styles["close-button"]}`} aria-label="Close" onClick={closetPopup}></button>
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" >
            <img src="https://www.multipoint.com.ar/Image/0/750_750-UN43T5300AGCZB-2.jpg" className="d-block mx-auto" alt="..." style={{ maxWidth: "100%", height: "400px", objectFit:"cover" }}/>
            <div className="carousel-caption d-none d-md-block">
              <h5 style={{fontSize:"25px"}}><strong>50% OFF</strong></h5>
            </div>
          </div>
          <div className="carousel-item" >
            <img src="https://d2r9epyceweg5n.cloudfront.net/stores/002/121/735/products/compu-ryzen-7-nueva1-248ddc8367183f99e016823471120108-1024-1024.png" className="d-block mx-auto" alt="..." style={{ maxWidth: "100%", height: "400px", objectFit:"cover" }}/>
            <div className="carousel-caption d-none d-md-block">
              <h5 style={{fontSize:"25px"}}><strong>25% OFF</strong></h5>
            </div>
          </div>
          <div className="carousel-item" >
            <img src="https://d2eebw31vcx88p.cloudfront.net/garbarino/uploads/6a134a0ca66bf8144038feb9d6610d2572a17736.jpg" className="d-block mx-auto" alt="..." style={{ maxWidth: "100%", height: "400px", objectFit:"cover" }}/>
            <div className="carousel-caption d-none d-md-block">
              <h5 style={{fontSize:"25px"}}><strong>TODAY 2X1</strong></h5>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  </div>
    )
};
export default PromotionPopup;

{/*
        <div className={styles["poput-content"]}>
          <div className="card" style={{position:"relative", overflow:"hidden", }}>
            <img src={images[currentImage]} alt={`Imagen ${currentImage + 1}`} className="card-img-top" style={{width:"350px"}}/>
            <button onClick={prevImage} style={{position:"absolute", top:"35%", transform: "translateY(-50%)", backgroundColor: "rgba(255, 255, 255, 0.7)",
            border:"none", padding:"10px", fontSize:"18px", cursor:"pointer", left: "34px"}}>&lt;</button>
            <button onClick={nextImage} style={{position:"absolute", top:"35%", transform: "translateY(-50%)", backgroundColor: "rgba(255, 255, 255, 0.7)",
            border:"none", padding:"10px", fontSize:"18px", cursor:"pointer", right: "34px"}}>&gt;</button>
            <div className="card-body">
              <h5 className="card-title">50% OFF</h5>
              <p className="card-text">Description</p>
              <button type="button" className="btn btn-secondary" onClick={closetPopup} style={{width:"100px"}}>Close</button>
            </div>
          </div>
        </div>

*/}