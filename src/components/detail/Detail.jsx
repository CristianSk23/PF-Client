import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Fireworks from "react-fireworks";
import {
  getProductsById,
  cleanSingleProd,
  addToCart,
} from "../../redux/action/actions";
import NavBar from "../navBar/NavBar";
import StarRating from "./startCont"; //* Agregado para mostrar el rating en forma de estrella
import { toast } from "react-toastify";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const prodById = useSelector((state) => state.products.singleProduct);
  const isUser = useSelector((state) => state.isUser);
  const dispatch = useDispatch();
  const [productLoaded, setProductLoaded] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    category: "",
    brand: "",
    description: "",
    price: 0,
    discountPercentage: 0,
    image: [],
    reviews: [],
    active: false,
    tags: "None",
    stock: 0,
    priceOnSale: 0,
  });

  const handleCancel = () => {
    navigate(-1);
  };

  const handleBuy = () => {
    dispatch(addToCart(id));
    toast.success('Product added to cart!', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      // theme: "dark",
      // theme: "light",
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getProductsById(id));
      } catch (error) {}
    };

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
        reviews: [],
        active: false,
        tags: "None",
        stock: 0,
        priceOnSale: 0,
      });
      dispatch(cleanSingleProd());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (id && !productLoaded && prodById?.nameProd) {
      setProduct({
        name: prodById.nameProd || "",
        category: prodById.category || "",
        brand: prodById.brand || "",
        description: prodById.description || "",
        price: prodById.price || 0,
        discountPercentage: prodById.discountPercentage || 0,
        image: prodById.image || [],
        reviews: prodById.reviews || [],
        active: prodById.active.toString() || "true",
        tags: prodById.tags || "None",
        stock: prodById.stock || 0,
        priceOnSale: prodById.priceOnSale || 0,
      });
      setProductLoaded(true);
    }
  }, [id, productLoaded, prodById, product]);

  return (
    <div>
      
      <NavBar />
      <div style={{ backgroundColor: "#F8F9F9", minHeight: "100vh" }}>
        <div className="d-flex align-items-center justify-content-center">
          <div
            className="card mb-3"
            style={{ width: "1080px", marginTop: "100px" }}
          >
            <div className="row g-0">
              <div className="col-md-4">
                <div
                  id="carouselExampleDark"
                  className="carousel carousel-dark slide"
                >
                  <div className="carousel-inner">
                    {product.image.map((imageUrl, index) => (
                      <div
                        key={index}
                        className={`carousel-item ${
                          index === 0 ? "active" : ""
                        }`}
                        data-bs-interval="2000"
                      >
                        <img
                          src={imageUrl}
                          className="d-block w-100"
                          alt={`product-${index}`}
                          style={{
                            width: "100%",
                            height: "350px",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                    ))}
                    {product.image.length > 1 && (
                      <>
                        <button
                          className="carousel-control-prev"
                          type="button"
                          data-bs-target="#carouselExampleDark"
                          data-bs-slide="prev"
                        >
                          <span
                            className="carousel-control-prev-icon"
                            aria-hidden="true"
                          ></span>
                          <span className="visually-hidden">Previous</span>
                        </button>
                        <button
                          className="carousel-control-next"
                          type="button"
                          data-bs-target="#carouselExampleDark"
                          data-bs-slide="next"
                        >
                          <span
                            className="carousel-control-next-icon"
                            aria-hidden="true"
                          ></span>
                          <span className="visually-hidden">Next</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text" style={{ marginTop: "20px" }}>
                    <span style={{ fontWeight: "bold" }}>Brand:</span>{" "}
                    {product.brand}
                  </p>
                  <p className="card-text">
                    <span style={{ fontWeight: "bold" }}>Category:</span>{" "}
                    {product.category}
                  </p>
                  <p className="card-text">
                    <span style={{ fontWeight: "bold" }}>Description:</span>{" "}
                    {product.description}
                  </p>
                  <p className="card-text">
                    <span style={{ fontWeight: "bold" }}>Stock:</span>{" "}
                    {product.stock}
                  </p>
                  <p></p>
                  <p className="card-text">
                    <span style={{ fontWeight: "bold" }}>Price:</span>{" "}
                    {product.discountPercentage > 0 ? (
                      <>
                        <span
                          style={{
                            textDecoration: "line-through",
                            color: "red",
                          }}
                        >
                          ${product.price}
                        </span>
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "green",
                            marginLeft: "10px",
                          }}
                        >
                          {product.discountPercentage}% OFF
                        </span>
                        <p className="card-text" style={{ marginTop: "15px" }}>
                          <span style={{ fontWeight: "bold" }}>
                            Price On Sale:
                          </span>{" "}
                          ${product.priceOnSale}
                        </p>
                      </>
                    ) : (
                      `$ ${product.price}`
                    )}
                  </p>
                  {isUser === "Admin" ? (<div></div>): (
                  <div>
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
                  </div>
                  )}
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

        <div className="d-flex align-items-center justify-content-center">
        <div style={{width:"1080px", margin: "auto", marginBottom:"30px"}}>
          <div style={{marginTop:"20px", padding:"10px", backgroundColor: "ffffff", boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'}}>
          <h3>REVIEWS:</h3>
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review, index) => (
                <div key={index} style={{marginTop:"20px", padding:"10px", backgroundColor: "ffffff", boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'}}>
                  <h3>{review.name}</h3>
                  <StarRating rating={review.rating} />
                  <p>{review.comment}</p>
                </div>
              ))
            ) : (
              <p>No reviews available.</p>
            )}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
