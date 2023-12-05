import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import { getProductsById, cleanSingleProd, addToCart } from "../../redux/action/actions";
import NavBar from "../navBar/NavBar";



const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const prodById = useSelector((state) => state.singleProduct);
  const dispatch = useDispatch()
  const [productLoaded, setProductLoaded] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    category: "",
    brand: "",
    description: "",
    price: 0,
    discountPercentage: 0,
    image: [],
    active: false,
    tags: "None",
    stock: 0,
  });
  
  
  const handleCancel = () => {
    navigate(-1);
  };

  const handleBuy = () => {
    dispatch(addToCart(id));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data
        await dispatch(getProductsById(id));
      } catch (error) {}
    };

    

    // Call fetchData

    fetchData();

    return () => {
      setProduct({
        id: "",
        name: "",
        category: "",
        brand: "",
        description: "",
        price: 0,
        discountPercentage: 0,
        image: [],
        active: false,
        tags: "None",
        stock: 0,
      });
      dispatch(cleanSingleProd());
    };
  }, [dispatch, id]);

  useEffect(() => {
    // Access the state (prodById) after the data is fetched

    if (id && !productLoaded && prodById?.nameProd) {
      setProduct({
        name: prodById.nameProd || "",
        category: prodById.category || "",
        brand: prodById.brand || "",
        description: prodById.description || "",
        price: prodById.price || 0,
        discountPercentage: prodById.discountPercentage || 0,
        image: prodById.image || [],
        active: prodById.active.toString() || "true",
        tags: prodById.tags || "None",
        stock: prodById.stock || 0,
      });
      setProductLoaded(true);
    }
    // return setProductLoaded(false)
  }, [id, productLoaded, prodById, product]);

  return (
    <div>
    <NavBar />
    <div style={{ backgroundColor: "#F8F9F9", minHeight: "100vh" }}>
      <div className="d-flex align-items-center justify-content-center">
        <div
          className="card mb-3"
          style={{ width: "1080px", marginTop: "160px" }}
        >
          <div className="row g-0">
            <div className="col-md-4">
            <div id="carouselExampleDark" className="carousel carousel-dark slide">
                <div className="carousel-inner">
                  {product.image.map((imageUrl, index) => (
                  <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`} data-bs-interval="2000">
                  <img
                    src={imageUrl}
                    className="d-block w-100"
                    alt={`product-${index}`}
                    style={{ width: "100%", height: "230px", objectFit: "contain" }}
                  />
                  </div>
                ))}
              </div>
              {product.image.length > 1 && (
                <>
                  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </>
              )}
                </div>
                
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text" style={{ marginTop: "20px" }}>
                  <span style={{ fontWeight: "bold" }}>Brand:</span> {product.brand}
                </p>
                <p className="card-text">
                  <span style={{ fontWeight: "bold" }}>Category:</span> {product.category}
                </p>
                <p className="card-text">
                  <span style={{ fontWeight: "bold" }}>Description:</span> {product.description}
                </p>
                <p className="card-text">
                  <span style={{ fontWeight: "bold" }}>Stock:</span> {product.stock}
                </p>
                <h5 className="card-title">
                  <span style={{ fontWeight: "bold" }}>Price:</span> $ {product.price}
                </h5>
              <a
                  className="btn btn-success"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    margin: "10px",
                    marginRight: "140px",
                    width: "120px",
                  }}
                  onClick={handleBuy}
                >
                  <FontAwesomeIcon icon={faCartShopping} />
                </a>
                <a
                  onClick={handleCancel}
                  className="btn btn-light"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    margin: "10px",
                    width: "120px",
                  }}
                >
                  Back
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    </div>
  );
}

export default Detail;