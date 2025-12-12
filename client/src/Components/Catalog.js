import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa6";
import { getProducts, likeProduct } from "../Features/AddProductSlice";
import { addToCart } from "../Features/CartSlice";
import "./Catalog.css"; 

const Catalog = () => {
  const products = useSelector((state) => state.products.products);
  const user = useSelector((state) => state.users.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleLikeProduct = (productId) => {
    const productData = {
      productId: productId,
      userId: user._id,
    };
    dispatch(likeProduct(productData));
    navigate("/home");
  };

  const handleAddToCart = (productId) => {
    const product = products.find((p) => p._id === productId);
    if (!product) return;

    dispatch(addToCart({ userId: user._id, productId }));
    window.alert(`"${product.productName}" has been added to your cart.`);
  };

  return (
    <div className="catalog-container">
      {products.map((product) => (
        <div className="card" key={product._id}>
          <div className="like">
            <Link onClick={() => handleLikeProduct(product._id)}>
              <FaThumbsUp style={{ color: "#ffa500", cursor: "pointer" }} />
            </Link>
            {product.likes.count}
          </div>

          <div className="image-container">
            <img src={product.productImage} alt={product.productName} />
          </div>

          <h2 className="product-name">{product.productName}</h2>
          <p className="description">{product.productDiscribtion}</p>
          <p className="price">{product.productPrice} OMR</p>
          <p className="date">In Stock {product.productQuantity}</p>
          <p className="date">{moment(product.createdAt).fromNow()}</p>
          <button className="add-to-cart" onClick={() => handleAddToCart(product._id)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default Catalog;
