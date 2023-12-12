import styles from "./updateProduct.module.css";
import validation from "../createProduct/validation";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  uploadImageToCloudinary,
  uploadImageByFileToCloudinary,
} from "../../utils/cloudinary";
import { Image } from "cloudinary-react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  updateProduct,
  getProdCategories,
  getProductsById,
  cleanSingleProd,
} from "../../redux/action/actions";
import PopupGeneral from "../popupGeneral/PopupGeneral";
import NavBar from "../navBar/NavBar";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
import ErrorView from "../error404/Error404";

const UpdateProduct = () => {
  const {isAuthenticated, isLoading} = useAuth0()
  const dispatch = useDispatch();
  const { id } = useParams();
  const catchError = useSelector((state) => state.catchError);
  const prodCategories = useSelector((state) => state.prodCategories);
  const allProducts = useSelector((state) => state.products.allProducts);
  const prodById = useSelector((state) => state.products.singleProduct);
  const isUser = useSelector((state) => state.isUser) 
  const navigate = useNavigate();
  const [productLoaded, setProductLoaded] = useState(false);
  const [errors, setErrors] = useState({});
  const [isFile, setIsFile] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
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
        category: prodById.categoryId || "",
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

    dispatch(getProdCategories());

    if (
      product.name !== "" ||
      product.category !== "" ||
      product.brand !== "" ||
      product.description !== "" ||
      product.price !== 0 ||
      product.discountPercentage !== 0 ||
      product.image.length !== 0 ||
      product.stock !== 0
    ) {
      setErrors(validation(product, allProducts, prodById?.nameProd));
    }
    // return setProductLoaded(false)
  }, [id, productLoaded, prodById, product]);

  const handleImageUrlChange = (index, newUrl) => {
    setProduct({
      ...product,
      image: product.image.map((url, i) => (i === index ? newUrl : url)),
    });
  };
  const sendImageUrlChange = async (index) => {
    try {
      const imageUrl = product.image[index];
      if (imageUrl) {
        const newUrlForIndex = await uploadImageToCloudinary(imageUrl);
        const updatedImages = [...product.image];
        updatedImages[index] = newUrlForIndex;
        setProduct((prevProduct) => ({ ...prevProduct, image: updatedImages }));
        toast.success('Image has been saved!', {
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
      }
    } catch (error) {
      console.error("Error al manejar la imagen:", error);
      toast.error('Error loading image', {
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
    }
  };

  const handleImageAdd = () => {
    setProduct({ ...product, image: [...product.image, ""] });
  };

  const handleImageRemove = (index) => {
    setProduct({
      ...product,
      image: product.image.filter((_, i) => i !== index),
    });
    toast.success('Image has been removed!', {
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

  const handleChange = async (event) => {
    if (event.target.name === "price") {
      // Validar que el valor ingresado sea un número con hasta dos decimales después de la coma, sin aceptar puntos
      const isValidInput = /^(?!0)(\d+(\.\d{0,2})?)?$/.test(event.target.value);

      if (isValidInput || event.target.value === "") {
        // Reemplazar comas adicionales por una sola coma
        const cleanedValue = event.target.value.replace(/,+/g, ".");

        setProduct({
          ...product,
          [event.target.name]: cleanedValue,
        });
      }
    } else {
      setProduct({
        ...product,
        [event.target.name]: event.target.value,
      });
    }
    if (event.target.name === "active") {
      const isActive = event.target.value === "true";
      setProduct({
        ...product,
        [event.target.name]: isActive,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newProduct = {
      id: id,
      nameProd: product.name,
      CategoryId: parseInt(product.category),
      brand: product.brand,
      description: product.description,
      price: parseFloat(product.price),
      discountPercentage: product.discountPercentage,
      image: product.image,
      active: Boolean(product.active),
      tags: product.tags,
      stock: product.stock,
    };
    console.log('newProduct');
    console.log(newProduct);
    await dispatch(updateProduct(newProduct));
    setShowConfirmation(true);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    navigate(-1);
  };

  const changeIsFile = () => {
    setIsFile(!isFile);
  };

  const handleUploadImageByFile = async (event) => {
    await uploadImageByFileToCloudinary(event, setProduct, product);
  };

  if(!isLoading && ((!isAuthenticated && isUser !== "Admin") || isUser === "User")){
    return(
      <div>
        <ErrorView />
      </div>
    )
  }

  return (!isLoading &&
    <div style={{ backgroundColor: "#F8F9F9", minHeight: "900px" }}>
      <NavBar />
      <div style={{ marginTop: "60px" }}>
        <h1 className="text-center m-5">Update Product</h1>
        <Form onSubmit={handleSubmit} className={styles.container}>
          <div className={styles.input_container}>
            <div className={styles.input_name}>
              <FloatingLabel
                htmlFor="name"
                id="floatingInput"
                label="Product Name"
                className="w-100 me-2"
              >
                <Form.Control
                  id="name"
                  className={styles.form_input}
                  type="text"
                  placeholder="Product Name"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                />
                {errors.name !== "" && (
                  <span className={styles.errorMessage}> {errors.name}</span>
                )}
              </FloatingLabel>
              <FloatingLabel
                htmlFor="brand"
                id="floatingInput"
                label="Brand"
                className="w-100 me-2"
              >
                <Form.Control
                  id="brand"
                  className={styles.form_input}
                  type="text"
                  placeholder="Brand"
                  name="brand"
                  value={product.brand}
                  onChange={handleChange}
                />
                {errors.brand !== "" && (
                  <span className={styles.errorMessage}> {errors.brand}</span>
                )}
              </FloatingLabel>
            </div>
            <div className={styles.input_name}>
              <FloatingLabel
                htmlFor="price"
                id="floatingInput"
                label="Price"
                className="w-100 me-2"
              >
                <Form.Control
                  id="price"
                  className={styles.form_input}
                  type="text"
                  placeholder="Price"
                  name="price"
                  min="0"
                  value={product.price}
                  onChange={handleChange}
                />
                {errors.price !== "" && (
                  <span className={styles.errorMessage}> {errors.price}</span>
                )}
              </FloatingLabel>
              <FloatingLabel
                htmlFor="discountPercentage"
                id="floatingInput"
                label="Discount Percentage"
                className="w-100 me-2"
              >
                <Form.Control
                  id="discountPercentage"
                  className={styles.form_input}
                  type="number"
                  placeholder="Discount Percentage"
                  name="discountPercentage"
                  min="0"
                  max="100"
                  value={product.discountPercentage}
                  onChange={handleChange}
                />
                {errors.discountPercentage !== "" && (
                  <span className={styles.errorMessage}>
                    {" "}
                    {errors.discountPercentage}
                  </span>
                )}
              </FloatingLabel>
            </div>
            <div className={styles.input_name}>
              <FloatingLabel
                htmlFor="stock"
                id="floatingInput"
                label="Stock"
                className="w-100 me-2"
              >
                <Form.Control
                  id="stock"
                  className={styles.form_input}
                  type="number"
                  placeholder="Stock"
                  name="stock"
                  min="0"
                  max="10000"
                  value={product.stock}
                  onChange={handleChange}
                />
                {errors.stock !== "" && (
                  <span className={styles.errorMessage}> {errors.stock}</span>
                )}
              </FloatingLabel>
              <FloatingLabel
                htmlFor="category"
                id="floatingInput"
                label="Category"
                className="w-100 me-2"
              >
                <Form.Select
                  className={styles.form_input}
                  id="category"
                  name="category"
                  size="1"
                  onChange={handleChange}
                  value={product.category}
                >
                  <option value="" disabled hidden></option>
                  {prodCategories?.map((category) => {
                    return (
                      <option key={category.id} value={category.id}>
                        {category.nameCat}
                      </option>
                    );
                  })}
                </Form.Select>
                {errors.category !== "" && (
                  <span className={styles.errorMessage}>
                    {" "}
                    {errors.category}
                  </span>
                )}
              </FloatingLabel>
            </div>
            <div className={styles.input_name}>
              <FloatingLabel
                htmlFor="tags"
                id="floatingInput"
                label="Tags"
                className="w-100 me-2"
              >
                <Form.Select
                  name="tags"
                  id="tags"
                  value={product.tags}
                  className={styles.form_input}
                  aria-label="Default select example"
                  onChange={handleChange}
                >
                  <option value="None">None</option>
                  <option value="New">New</option>
                  <option value="Special Offer">Special Offer</option>
                  <option value="Limited Edition">Limited Edition</option>
                </Form.Select>
                {errors.tags !== "" && (
                  <span className={styles.errorMessage}> {errors.tags}</span>
                )}
              </FloatingLabel>

              <FloatingLabel
                htmlFor="active"
                id="floatingInput"
                label="State"
                className="w-100 me-2"
              >
                <Form.Select
                  id="active"
                  name="active"
                  className={styles.form_input}
                  aria-label="Default select example"
                  onChange={handleChange}
                  value={product.active}
                >
                  {/*MIRAR BIEN VALORES Y FUNCIONES Y AGREGAR ERRORES*/}
                  <option value={true}>Active</option>
                  <option value={false}>Disabled</option>
                </Form.Select>
              </FloatingLabel>
            </div>
            {!isFile && (
              <div className={styles.buttonContainer}>
                <Button
                  className={styles.customButton}
                  variant="primary"
                  type="submit"
                  onClick={changeIsFile}
                >
                  Upload image by file
                </Button>

                {product.image.map((url, index) => (
                  <div className={styles.input_name} key={index}>
                    <FloatingLabel
                      htmlFor={`image-${index}`}
                      id="floatingInput"
                      label="Image URL"
                      className="w-100 me-2"
                    >
                      <Form.Control
                        id={`image-${index}`}
                        className={styles.form_input}
                        type="url"
                        placeholder="URL Image"
                        name={`image-${index}`}
                        value={url}
                        onChange={(event) =>
                          handleImageUrlChange(index, event.target.value)
                        }
                      />
                    </FloatingLabel>
                    <button
                      type="button"
                      onClick={() => handleImageRemove(index)}
                    >
                      Remove
                    </button>
                    {!url.includes('cloudinary') && <button
                      type="button"
                      onClick={() => sendImageUrlChange(index)}
                    >
                      Save
                    </button>}
                    {url && (
                      <div>
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          style={{ maxWidth: "100px" }}
                        />
                      </div>
                    )}
                  </div>
                ))}

                {product.image.length < 5 && (
                  <div>
                    <button
                      type="button"
                      onClick={handleImageAdd}
                      style={{ marginTop: "8px" }}
                    >
                      Add Image
                    </button>
                  </div>
                )}

                {errors.image !== "" && (
                  <span className={styles.errorMessage}> {errors.image}</span>
                )}
              </div>
            )}

            {isFile && (
              <div className={styles.buttonContainer}>
                <Button
                  className={styles.customButton}
                  variant="primary"
                  type="submit"
                  onClick={changeIsFile}
                >
                  Upload image by url
                </Button>
                <div>
                  <input
                    type="file"
                    multiple
                    onChange={handleUploadImageByFile}
                  />
                  {product.image.length > 0 && (
                    <div>
                      <p>Uploaded images:</p>
                      {product.image.map((imageUrl, index) => (
                        <div key={index} className={styles.input_name}>
                          <Image
                            cloudName="TU_CLOUD_NAME"
                            publicId={imageUrl}
                            style={{ maxWidth: "100px" }}
                          />
                          <button
                            type="button"
                            onClick={() => handleImageRemove(index)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className={styles.input_name}>
              <FloatingLabel
                htmlFor="description"
                id="floatingInput"
                label="Description"
                className="w-100 me-6"
              >
                <Form.Control
                  id="description"
                  className={styles.form_input}
                  type="text"
                  placeholder="Description"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                />
              </FloatingLabel>
            </div>
            {errors.description !== "" && (
              <span className={styles.errorMessage}> {errors.description}</span>
            )}
            <Button
              className="w-100 my-4"
              variant="primary"
              type="submit"
              disabled={Object.keys(errors).length > 0 || product.name === ""}
            >
              Update
            </Button>
            <a
              onClick={handleCancel}
              className="btn btn-danger"
              style={{ marginTop: "-25px", marginBottom: "15px" }}
            >
              Cancel
            </a>
          </div>
        </Form>
        {showConfirmation && (
          <PopupGeneral
            textButton="Go home"
            descripcion="Successfully modified product"
            onClick={handleConfirmationClose}
          />
        )}
      </div>
    </div>
  );
};

export default UpdateProduct;
