import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import moment from "moment";
import { getProducts, deleteProduct } from "../Features/AddProductSlice";
import { FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import "./Manage.css";

const ManageProducts = () => {
  const products = useSelector((state) => state.products.products);
  const user = useSelector((state) => state.users.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="catalog-container">
      {products.map((product) => (
        <div className="card" key={product._id}>
          <div className="image-container">
            <img src={product.productImage} alt={product.productName} />
          </div>

          <h2 className="product-name">
            {product.productName}
          </h2>
          <p className="description">Code | {product.productCode}</p>
          <p className="description">{product.productDiscribtion}</p>
          <p className="price">{product.productPrice} OMR</p>
          <p className="date">In Stock {product.productQuantity}</p>
          <p className="date">{moment(product.createdAt).fromNow()}</p>

          {/* أيقونات التعديل والحذف جنبًا إلى جنب */}
          <div className="action-buttons">
            <FiEdit
              className="edit-icon"
              onClick={() => navigate(`/update-product/${product._id}`)}
              title="Edit Product"
            />
            <button
              className="delete-button"
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this product?")) {
                  dispatch(deleteProduct(product._id));
                }
              }}
              title="Delete Product"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageProducts;
