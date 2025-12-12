import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders } from '../Features/OrderSlice';
import './Orders.css';

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);
  //const { orders } = useSelector((state) => state.order || {});

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="orders-container">
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order._id}>
            <h2 className="order-title">Order Information</h2>
            <p><strong>Name :</strong> {order.fullName}</p>
            <p><strong>Email :</strong> {order.email}</p>
            <p><strong>Phone number :</strong> {order.phone}</p>
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
              <span>Total : {order.orderTotal.toFixed(2)} OMR</span>
              <span>Number of Items : {order.totalItems}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminOrders;
