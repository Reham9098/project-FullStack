import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersByUser } from "../Features/OrderSlice";
import "./Orders.css";

const Orders = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const { orderHistory, loading } = useSelector((state) => state.order);

  useEffect(() => {
    if (user?._id) {
      dispatch(getOrdersByUser(user._id));
    }
  }, [user, dispatch]);

  if (loading) return <p>Loading orders...</p>;
  if (!orderHistory?.length) return <p>No order history found.</p>;

  return (
    <div className="orders-container">
      {orderHistory.map((order) => (
        <div className="order-card" key={order._id}>
          <h2 className="order-title">Order Information</h2>
          <p><strong>Name :</strong> {order.fullName}</p>
          <p><strong>Email :</strong> {order.email}</p>
          <p><strong>Phone number :</strong>{order.phone}</p>
          <p><strong>Delivery Address :</strong> {order.deliveryAddress}</p>

          <table className="order-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Number</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((product, index) => (
                <tr key={index}>
                  <td>{product.code}</td>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="order-footer">
            <span><strong>Total :</strong> {order.orderTotal.toFixed(2)} OMR</span>
            <span><strong>Number of Items :</strong> {order.totalItems}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
