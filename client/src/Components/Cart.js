import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import moment from "moment";
import { getCart, updateCartQuantity, clearCartError } from "../Features/CartSlice";
import { useNavigate } from "react-router-dom";
import { removeFromCart } from "../Features/CartSlice";
import { FaTrash } from 'react-icons/fa';
import "./Cart.css";
//onClick={() => navigate("/checkout")}

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const cart = useSelector((state) => state.cart.cart);
  const error = useSelector((state) => state.cart.error);

  const handleRemove = (productId) => {
  if (user?._id) {
    dispatch(removeFromCart({ userId: user._id, productId }));
  }
};

useEffect(() => {
  if (error) {
    const timeout = setTimeout(() => {
      dispatch(clearCartError());
    }, 3000);
    return () => clearTimeout(timeout);
  }
}, [error, dispatch]);


  useEffect(() => {
    if (user?._id) {
      dispatch(getCart(user._id));
    }
  }, [dispatch, user]);

  const handleQuantityChange = (productId, type) => {
    if (user?._id) {
      dispatch(clearCartError());
      dispatch(
        updateCartQuantity({
          userId: user._id,
          productId,
          action: type,
        })
      );
    }
  };

  if (!cart || !cart.products?.length) {
    return <p>Your cart is empty.</p>;
  }
  

  const totalItems = cart.products.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.products.reduce(
    (sum, item) => sum + item.productId.productPrice * item.quantity,
    0
  );
  const tax = cartTotal * 0.05;
  const discount = cartTotal > 50 ? cartTotal * 0.03 : 0;
  const subtotal = cartTotal + tax - discount;

  return (
    <div className="cart-container">
      {error && <p className="error-message">{error}</p>}
      {cart.products.map((item) => {
        const product = item.productId;
        const totalPrice = product.productPrice * item.quantity;

        return (
          <div className="cart-card" key={product._id}>
            <img
              className="cart-img"
              src={product.productImage}
              alt={product.productName}
            />

            <div className="cart-info">
              <h2 className="cart-title">{product.productName}</h2>
              <p className="cart-desc">{product.productDiscribtion}</p>
              <p>{product.productPrice} OMR / item</p>
              <p>
                Total for this item: <strong>{totalPrice.toFixed(2)} OMR</strong>
              </p>
              <p>In Stock {product.productQuantity}</p>
              <p>{moment(product.createdAt).fromNow()}</p>
            </div>

            <div className="cart-controls">
              <button className="remove-btn" onClick={() => handleRemove(product._id)}>
               <FaTrash/>
              </button>
              <button
                className="qty-btn"
                onClick={() => handleQuantityChange(product._id, "decrease")}
                disabled={item.quantity <= 1}
              >
                −
              </button>
              <span className="qty">{item.quantity}</span>
              <button
                className="qty-btn"
                onClick={() => handleQuantityChange(product._id, "increase")}
                disabled={item.quantity >= product.productQuantity}
              >
                +
              </button>
              
            </div>
          </div>
        );
      })}

      {/* Updated Order Summary */}
      <div className="order-summary">
        <h2 className="summary-title">Order Summary</h2>

        <div className="summary-detail">
          <span>Number of items</span>
          <span>{totalItems}</span>
        </div>

        <div className="summary-detail">
          <span>Cart Total</span>
          <span>{cartTotal.toFixed(2)} OMR</span>
        </div>

        <div className="summary-detail">
          <span>Tax (5%)</span>
          <span>{tax.toFixed(2)} OMR</span>
        </div>

        <div className="summary-detail">
          <span>Get 3% discount if your total more than 50 OMR</span>
        </div>

        <div className="summary-detail">
          <span>Discount</span>
          <span>-{discount.toFixed(2)} OMR</span>
        </div>

        <div className="summary-detail total">
          <span><strong>Subtotal</strong></span>
          <span><strong>{subtotal.toFixed(2)} OMR</strong></span>
        </div>

        <div className="summary-btn">
          <button className="checkout-btn"onClick={() => navigate("/checkout")}>Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
