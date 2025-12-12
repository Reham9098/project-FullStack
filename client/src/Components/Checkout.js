import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkoutSchema } from "../Validations/checkoutValidation";
import { getCart } from "../Features/CartSlice";
import { createOrder } from "../Features/OrderSlice";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";
const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.user);
  const cart = useSelector((state) => state.cart.cart);

  // Individual useState for each field
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [cardType, setCardType] = useState("Visa");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(checkoutSchema),
  });

  useEffect(() => {
    if (user) {
      dispatch(getCart(user._id));
      setEmail(user.email); // autofill email
    }
  }, [user, dispatch]);

  const onSubmit = async () => {
    if (!user || !cart) {
      alert("User or cart not found");
      return;
    }

    const orderData = {
      userId: user._id,
      cartId: cart._id,
      fullName,
      email,
      phone,
      deliveryAddress: address,
      paymentMethod,
    };

    if (paymentMethod === "card") {
      orderData.cardDetails = {
        cardType,
        cardholderName: cardName,
        cardNumber,
        expiryDate,
        cvv,
      };
    }

    try {
      await dispatch(createOrder(orderData)).unwrap();
      alert("Order placed successfully!");
      navigate("/");
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Checkout</h2>

      <input
        type="text"
        placeholder="Full Name"
        {...register("fullName", { onChange: (e) => setFullName(e.target.value) })}
        value={fullName}
      />
      <p className="error">{errors.fullName?.message}</p>

      <input
        type="email"
        placeholder="Email"
        {...register("email", { onChange: (e) => setEmail(e.target.value) })}
        value={email}
      />
      <p className="error">{errors.email?.message}</p>

      <input
        type="tel"
        placeholder="Phone Number"
        {...register("phone", { onChange: (e) => setPhone(e.target.value) })}
        value={phone}
      />
      <p className="error">{errors.phone?.message}</p>

      <input
        type="text"
        placeholder="Delivery Address"
        {...register("address", { onChange: (e) => setAddress(e.target.value) })}
        value={address}
      />
      <p className="error">{errors.address?.message}</p>

      <h3>Payment Method</h3>
      <label>
        <input
          type="radio"
          value="cod"
          checked={paymentMethod === "cod"}
          onChange={() => setPaymentMethod("cod")}
        />
        Cash on Delivery
      </label>
      <label>
        <input
          type="radio"
          value="card"
          checked={paymentMethod === "card"}
          onChange={() => setPaymentMethod("card")}
        />
        Credit/Debit Card
      </label>

      {paymentMethod === "card" && (
        <>
          <h4>Card Type</h4>
          <label>
            <input
              type="radio"
              value="Visa"
              checked={cardType === "Visa"}
              onChange={() => setCardType("Visa")}
            />
            Visa
          </label>
          <label>
            <input
              type="radio"
              value="Mastercard"
              checked={cardType === "Mastercard"}
              onChange={() => setCardType("Mastercard")}
            />
            Mastercard
          </label>

          <input
            type="text"
            placeholder="Cardholder Name"
            {...register("cardName", { onChange: (e) => setCardName(e.target.value) })}
            value={cardName}
          />
          <p className="error">{errors.cardName?.message}</p>

          <input
            type="text"
            placeholder="Card Number"
            {...register("cardNumber", { onChange: (e) => setCardNumber(e.target.value) })}
            value={cardNumber}
          />
          <p className="error">{errors.cardNumber?.message}</p>

          <input
            type="text"
            placeholder="Expiry Date (MM/YY)"
            {...register("expiryDate", { onChange: (e) => setExpiryDate(e.target.value) })}
            value={expiryDate}
          />
          <p className="error">{errors.expiryDate?.message}</p>

          <input
            type="text"
            placeholder="CVV"
            {...register("cvv", { onChange: (e) => setCvv(e.target.value) })}
            value={cvv}
          />
          <p className="error">{errors.cvv?.message}</p>
        </>
      )}

      <button type="submit">Pay Now</button>
    </form>
  );
};

export default Checkout;
