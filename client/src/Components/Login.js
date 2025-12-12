import React, { useState } from "react";
import "./login.css";
import logo from "../Images/logo.png"; // ضع هنا مسار اللوجو الجديد
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchemaValidation } from "../Validations/LoginValidation";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Features/UserSlice";
import { useNavigate } from "react-router-dom";

const Login = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { msg } = useSelector((state) => state.users); // الرسائل من Redux
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchemaValidation),
  });

  const onSubmit = async () => {
    try {
      const resultAction = await dispatch(login({ email, password }));

      if (resultAction.type === "users/login/fulfilled") {
        onClose(); // إغلاق المودال عند نجاح تسجيل الدخول
        navigate("/"); // الانتقال للصفحة الرئيسية
      } else {
        console.log("Login failed:", resultAction.payload?.msg);
      }
    } catch (error) {
      console.log("Error during login:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="login-form-box">
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
          <img src={logo} alt="logo" className="login-logo" />
          <form className="div-form" onSubmit={handleSubmit(onSubmit)}>
            <h2>Sign In</h2>

            <div className="form-group">
              <input
                type="text"
                placeholder="Enter your email..."
                {...register("email", {
                  onChange: (e) => setEmail(e.target.value),
                })}
              />
              <p className="error">{errors.email?.message}</p>
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Enter your password..."
                {...register("password", {
                  onChange: (e) => setPassword(e.target.value),
                })}
              />
              <p className="error">{errors.password?.message}</p>
            </div>

            <button type="submit" className="button">
              Sign In
            </button>

            {msg && (
              <div className="server-message">
                <h5>{msg}</h5>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
