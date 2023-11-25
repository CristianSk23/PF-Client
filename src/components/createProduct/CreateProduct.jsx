import styles from "./createProduct.module.css";
import validation from "./validation";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { createProduct, getProdCategories } from "../../redux/action/actions";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const catchError = useSelector((state) => state.catchError);
  const prodCategories = useSelector((state) => state.prodCategories);
  const allProducts = useSelector((state) => state.products.allProducts);
  const [errors, setErrors] = useState({});
  const [product, setProduct] = useState({
    name: "",
    category: "",
    brand: "",
    description: "",
    price: 0,
    discountPercentage: 0,
    image: [],
    active: false,
    tags: "",
    stock: 0,
  });

  useEffect(() => {
    if (prodCategories.length === 0) {
      dispatch(getProdCategories());
    }
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
      setErrors(validation(product, allProducts));
    }
  }, [product, catchError]);

  const handleImageUrlChange = (index, newUrl) => {
    setProduct({
      ...product,
      image: product.image.map((url, i) => (i === index ? newUrl : url)),
    });
  };

  const handleImageAdd = () => {
    setProduct({ ...product, image: [...product.image, ""] });
  };

  const handleImageRemove = (index) => {
    setProduct({
      ...product,
      image: product.image.filter((_, i) => i !== index),
    });
  };

  const handleChange = async (event) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheck = async(event) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.checked
    });
}

  const handleSubmit = (event) => {
    event.preventDefault();
    const newProduct = {
      nameProd: product.name,
      CategoryId: product.category,
      brand: product.brand,
      description: product.description,
      price: product.price,
      discountPercentage: product.discountPercentage,
      image: product.image,
      active: product.active,
      tags: product.tags,
      stock: product.stock,
    };
    console.log(newProduct);

    dispatch(createProduct(newProduct));

    setProduct({
      name: "",
      category: "",
      brand: "",
      description: "",
      price: 0,
      discountPercentage: 0,
      image: [],
      active: false,
      tags: "",
      stock: 0,
    });
  };

  return (
    <div>
      <div>Create Product</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Product Name: </label>
        <input
          type="text"
          name="name"
          id="name"
          value={product.name}
          onChange={handleChange}
        />
        {errors.name !== "" && (
          <span className={styles.errorMessage}> {errors.name}</span>
        )}
        <br />
        <label htmlFor="category">Category: </label>
        <select
          id="category"
          name="category"
          size="1"
          onChange={handleChange}
          className="selCategory"
        >
          <option value="" defaultValue=""></option>
          {prodCategories?.map((category) => {
            return (
              <option key={category.id} value={category.id}>
                {category.nameCat}
              </option>
            );
          })}
        </select>
        {errors.category !== "" && (
          <span className={styles.errorMessage}> {errors.category}</span>
        )}
        <br />
        <label htmlFor="brand">Brand: </label>
        <input
          type="text"
          name="brand"
          id="brand"
          value={product.brand}
          onChange={handleChange}
        />
        {errors.brand !== "" && (
          <span className={styles.errorMessage}> {errors.brand}</span>
        )}
        <br />
        <label htmlFor="description">
          Description:
          <textarea
            id="description"
            name="description"
            rows="4"
            cols="50"
            value={product.description}
            onChange={handleChange}
            placeholder="Enter your description here..."
            style={{ resize: "none" }}
          />
        </label>
        {errors.description !== "" && (
          <span className={styles.errorMessage}> {errors.description}</span>
        )}
        <br />
        <label htmlFor="price">
          Price:
          <input
            type="number"
            id="price"
            name="price"
            min="0"
            value={product.price}
            onChange={handleChange}
            placeholder="Enter price here..."
          />
        </label>
        {errors.price !== "" && (
          <span className={styles.errorMessage}> {errors.price}</span>
        )}
        <br />
        <label htmlFor="discountPercentage">
          Discount Percentage:
          <input
            type="number"
            id="discountPercentage"
            name="discountPercentage"
            min="0"
            max="100"
            value={product.discountPercentage}
            onChange={handleChange}
            placeholder="Enter Discount Percentage here..."
          />
        </label>
        {errors.discountPercentage !== "" && (
          <span className={styles.errorMessage}>
            {" "}
            {errors.discountPercentage}
          </span>
        )}

        <br />
        {product.image.map((url, index) => (
          <div key={index}>
            <label htmlFor={`image-${index}`}>
              Image URL {index + 1}:
              <input
                type="url"
                id={`image-${index}`}
                name={`image-${index}`}
                value={url}
                onChange={(event) =>
                  handleImageUrlChange(index, event.target.value)
                }
                placeholder="Enter image URL here..."
              />
            </label>
            <button type="button" onClick={() => handleImageRemove(index)}>
              Remove
            </button>
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
          <button type="button" onClick={handleImageAdd}>
            Add Image
          </button>
        )}
        {errors.image !== "" && (
          <span className={styles.errorMessage}> {errors.image}</span>
        )}
        <br />
        <label htmlFor="active">
          Active:
          <input
            type="checkbox"
            id="active"
            name="active"
            checked={product.active}
            onChange={handleCheck}
          />
        </label>
        <br />
        <label htmlFor="tags">Tags: </label>
        <select name="tags" id="tags" onChange={handleChange}>
          <option value="">None</option>
          <option value="New">New</option>
          <option value="Special Offer">Special Offer</option>
          <option value="Limited Edition">Limited Edition</option>
        </select>
        {errors.tags !== "" && (
          <span className={styles.errorMessage}> {errors.tags}</span>
        )}
        <br />

        <label htmlFor="stock">
          Stock:
          <input
            type="number"
            id="stock"
            name="stock"
            min="0"
            max="10000"
            value={product.stock}
            onChange={handleChange}
            placeholder="Enter stock amount here..."
          />
        </label>
        {errors.stock !== "" && (
          <span className={styles.errorMessage}> {errors.stock}</span>
        )}
        <button
          type="submit"
          disabled={Object.keys(errors).length > 0 || product.name === ""}
          className="submit-button"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;