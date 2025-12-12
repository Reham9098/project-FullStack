import { Button, Col, Container, Row, Alert } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { AddProduct } from "../Features/AddProductSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addProductSchemaValidation } from "../Validations/AddProductValidation";
import AddProductImage from "../Images/categ11.jpg";
import "./FormStyle.css";

const AddProducts = () => {
  const { user } = useSelector((state) => state.users);

  const [successMsg, setSuccessMsg] = useState("");

  const [productCode, setProductCode] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productDiscribtion, setProductDiscribtion] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productCategory, setProductCategory] = useState("");

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addProductSchemaValidation),
  });

  const onSubmit = () => {
    const productData = {
      productCode,
      productName,
      productPrice,
      productQuantity,
      productDiscribtion,
      productImage,
      productCategory,
      email: user.email,
    };

    dispatch(AddProduct(productData)).then(() => {
      setSuccessMsg("Product added successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
    });

    // Clear inputs
    setProductCode("");
    setProductName("");
    setProductPrice("");
    setProductQuantity("");
    setProductDiscribtion("");
    setProductImage("");
    setProductCategory("");
  };

  return (
    <Container fluid className="p-0">
      <Row className="g-0 min-vh-100 d-flex">
        {/* Left Image */}
        <Col lg="6">
          <img
            src={AddProductImage}
            alt="Product Illustration"
            style={{ width: "100%", height: "80%", objectFit: "contain" }}
          />
        </Col>

        {/* Right Form */}
        <Col lg="6" className="d-flex align-items-start justify-content-center pt-5">
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              width: "80%",
              maxWidth: "800px",
              border: "1px solid #ddd",
              borderRadius: "15px",
              padding: "20px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
            }}
          >
            <h2 className="mb-4" style={{ fontWeight: "bold" }}>Add Product</h2>
            {successMsg && <Alert color="success">{successMsg}</Alert>}

            {/* Product Code + Category */}
            <div className="d-flex gap-3">
              <div className="flex-fill mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Product Code"
                  {...register("productCode", {
                    onChange: (e) => setProductCode(e.target.value),
                  })}
                  value={productCode}
                />
                <p className="error">{errors.productCode?.message}</p>
              </div>
              <div className="flex-fill mb-3">
                <select
                  className="form-control"
                  {...register("productCategory", {
                    onChange: (e) => setProductCategory(e.target.value),
                  })}
                  value={productCategory}
                >
                  <option value="">Select Category</option>
                  <option value="Indoor Plants">Indoor Plants</option>
                  <option value="Outdoor Plants">Outdoor Plants</option>
                  <option value="Plant Care Tools / Accessories">Plant Care Tools / Accessories</option>
                </select>
                <p className="error">{errors.productCategory?.message}</p>
              </div>
            </div>

            {/* Product Name */}
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Product Name"
                {...register("productName", {
                  onChange: (e) => setProductName(e.target.value),
                })}
                value={productName}
              />
              <p className="error">{errors.productName?.message}</p>
            </div>

            {/* Price + Quantity */}
            <div className="d-flex gap-3">
              <div className="flex-fill mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Price"
                  {...register("productPrice", {
                    onChange: (e) => setProductPrice(e.target.value),
                  })}
                  value={productPrice}
                />
                <p className="error">{errors.productPrice?.message}</p>
              </div>
              <div className="flex-fill mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Quantity"
                  {...register("productQuantity", {
                    onChange: (e) => setProductQuantity(e.target.value),
                  })}
                  value={productQuantity}
                />
                <p className="error">{errors.productQuantity?.message}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                {...register("productDiscribtion", {
                  onChange: (e) => setProductDiscribtion(e.target.value),
                })}
                value={productDiscribtion}
              />
              <p className="error">{errors.productDiscribtion?.message}</p>
            </div>

            {/* Image URL */}
            <div className="mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="Image URL"
                {...register("productImage", {
                  onChange: (e) => setProductImage(e.target.value),
                })}
                value={productImage}
              />
              <p className="error">{errors.productImage?.message}</p>
            </div>

            <Button type="submit" color="dark" className="w-100">
              Add Now
            </Button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddProducts;
