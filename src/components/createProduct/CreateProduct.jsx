import styles from "./createProduct.module.css";
import validation from "./validation";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { createProduct, getProdCategories } from "../../redux/action/actions";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

//MIRAR PORQUE PIDE LAS VALIDACIONES EN UN ORDER QUE NO COINCIDE CON MI FORM

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
      product.brand !== "" ||
      product.price !== 0 ||
      product.discountPercentage !== 0 ||
      product.stock !== 0 ||
      product.category !== "" ||
      product.image.length !== 0 ||
      product.description !== "" 
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
      brand: product.brand,
      price: product.price,
      discountPercentage: product.discountPercentage,
      stock: product.stock,
      CategoryId: product.category,
      tags: product.tags,
      active: product.active,
      image: product.image,
      description: product.description,
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
      <h1 className='text-center m-5'>Create Product</h1>
            <Form onSubmit={handleSubmit} className={styles.container}>
                <div className={styles.input_container}>
                    <div className={styles.input_name}>
                        <FloatingLabel htmlFor="name" controlId="floatingInput" label="Product Name" className="w-100 me-2">
                            <Form.Control
                                id="name"
                                className={styles.form_input}
                                type="text"
                                placeholder="Product Name"
                                name='name'
                                value={product.name}
                                onChange={handleChange}
                            />
                            {errors.name !== "" && (
                            <span className={styles.errorMessage}> {errors.name}</span>
                            )}
                        </FloatingLabel>
                        <FloatingLabel htmlFor="brand" controlId="floatingInput" label="Brand" className="w-100 me-2">
                            <Form.Control
                                id="brand"
                                className={styles.form_input}
                                type="text"
                                placeholder="Brand"
                                name='brand'
                                value={product.brand}
                                onChange={handleChange}
                            />
                            {errors.brand !== "" && (
                            <span className={styles.errorMessage}> {errors.brand}</span>
                            )}
                        </FloatingLabel>
                    </div>
                    <div className={styles.input_name}>
                        <FloatingLabel htmlFor="price" controlId="floatingInput" label="Price" className="w-100 me-2">
                            <Form.Control
                                id="price"
                                className={styles.form_input}
                                type="number"
                                placeholder="Price"
                                name='price'
                                min="0"
                                value={product.price}
                                onChange={handleChange}
                            />
                            {errors.price !== "" && (
                            <span className={styles.errorMessage}> {errors.price}</span>
                            )}
                        </FloatingLabel>
                        <FloatingLabel htmlFor="discountPercentage" controlId="floatingInput" label="Discount Percentage" className="w-100 me-2">
                            <Form.Control
                                id="discountPercentage"
                                className={styles.form_input}
                                type="number"
                                placeholder="Discount Percentage"
                                name='discountPercentage'
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
                        <FloatingLabel htmlFor="stock" controlId="floatingInput" label="Stock" className="w-100 me-2">
                            <Form.Control
                                id="stock"
                                className={styles.form_input}
                                type="number"
                                placeholder="Stock"
                                name='stock'
                                min="0"
                                max="10000"
                                value={product.stock}
                                onChange={handleChange}
                              />
                            {errors.stock !== "" && (
                            <span className={styles.errorMessage}> {errors.stock}</span>
                            )}
                        </FloatingLabel>
                        <FloatingLabel htmlFor="category" controlId="floatingInput" label="Category" className="w-100 me-2">
                            <Form.Select className={styles.form_input} 
                              id="category"
                              name="category"
                              size="1"
                              onChange={handleChange}
                            >
                                <option value="" defaultValue="" disabled selected hidden></option>
                                {prodCategories?.map((category) => {
                                  return (
                                    <option key={category.id} value={category.id}>
                                      {category.nameCat}
                                    </option>
                                  )
                                })}
                            </Form.Select>
                            {errors.category !== "" && (
                            <span className={styles.errorMessage}> {errors.category}</span>
                            )}
                        </FloatingLabel>
                    </div>

                    <div className={styles.input_name}>
                        <FloatingLabel htmlFor="tags" controlId="floatingInput" label="Tags" className="w-100 me-2">
                            <Form.Select name="tags" id="tags" className={styles.form_input} aria-label="Default select example" onChange={handleChange}>
                              <option value="">None</option>
                              <option value="New">New</option>
                              <option value="Special Offer">Special Offer</option>
                              <option value="Limited Edition">Limited Edition</option>
                            </Form.Select>
                            {errors.tags !== "" && (
                            <span className={styles.errorMessage}> {errors.tags}</span>
                            )}
                        </FloatingLabel>

                        <FloatingLabel htmlFor="active" controlId="floatingInput" label="State" className="w-100 me-2">
                            <Form.Select id="active" name="active" className={styles.form_input} aria-label="Default select example">
                              {/*MIRAR BIEN VALORES Y FUNCIONES Y AGREGAR ERRORES*/}
                                <option value="active">Active</option>
                                <option value="disabled">Disabled</option>
                            </Form.Select>
                        </FloatingLabel>
                    </div>
                    
                    {product.image.map((url, index) => (
                        <div className={styles.input_name} key={index}>
                            <FloatingLabel htmlFor={`image-${index}`} controlId="floatingInput" label="Image URL" className="w-100 me-2">
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
                            <button type="button" onClick={() => handleImageRemove(index)}>Remove</button>
                            {url && (
                              <div>
                                <img src={url} alt={`Preview ${index + 1}`} style={{ maxWidth: "100px" }} />
                              </div>
                            )}
                        </div>
                    ))}
                    {product.image.length < 5 && (
                    <button type="button" onClick={handleImageAdd} style={{marginTop:"8px"}}>
                      Add Image
                    </button>
                    )}
                    {errors.image !== "" && (
                      <span className={styles.errorMessage}> {errors.image}</span>
                    )}

                    <div className={styles.input_name}>
                        <FloatingLabel htmlFor="description" controlId="floatingInput" label="Description" className="w-100 me-6">
                            <Form.Control
                                id="description"
                                className={styles.form_input}
                                type="text"
                                placeholder="Description"
                                name='description'
                                value={product.description}
                                onChange={handleChange}
                            />
                            {errors.description !== "" && (
                            <span className={styles.errorMessage}> {errors.description}</span>
                            )}
                        </FloatingLabel>
                    </div>

                    <Button className='w-100 my-4' variant="primary" type="submit" disabled={Object.keys(errors).length > 0 || product.name === ""}>
                        Create 
                    </Button>
                </div>
            </Form>

            {/*VER PORQUE BOTON DE BACK NO VUELVE HACIA LA LANDING*/}
            <div className={styles.botonBack}>
                <a href="/" className="btn btn-primary" role="button" data-bs-toggle="button">Volver</a>
            </div>
    </div>
  );
};

export default CreateProduct;