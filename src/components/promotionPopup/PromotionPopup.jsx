import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showThePopup } from "../../redux/action/actions";
import { useEffect } from "react";

import styles from "./promotionPopup.module.css";

const PromotionPopup = () => {
  const dispatch = useDispatch();

  const showPopup = useSelector((state) => state.isShowPopup);
  const [currentImage, setCurrentImage] = useState(0); // para el slider, cambiar por la libreria que se use

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

  return (
      showPopup && <div className={styles.popup}>
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
      </div>
    )
};
export default PromotionPopup;

{/*    






showPopup && (
      <div className={styles.popup}>
        <div className={styles["poput-content"]}>
          <h2>50% OFF</h2>
          <div className={styles.slider}>
            <img
              src={images[currentImage]}
              alt={`Imagen ${currentImage + 1}`}
            />
            <button onClick={prevImage}>&lt;</button>
            <button onClick={nextImage}>&gt;</button>
          </div>
          <p>Descripcion</p>
          <button onClick={closetPopup}>Close</button>
        </div> */}