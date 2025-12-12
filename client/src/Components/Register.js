import React, { useState, useEffect } from "react"; // أضف useEffect
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Features/UserSlice";
import { useNavigate } from "react-router-dom"; // أضف useNavigate
import "./login.css";
import logo from "../Images/logo.png";
import { userSchemaValidation } from "../Validations/UserValidations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const Register = ({ isOpen, toggle }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // أضف navigate
  const { isLogin, msg } = useSelector((state) => state.users); // أضف isLogin
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(userSchemaValidation),
  });

  const password = watch("password");

  // ===========================
  // UseEffect للتحقق من تسجيل الدخول وإغلاق المودال
  // ===========================
  useEffect(() => {
 
}, []);


  const registerHandler = async (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    const resultAction = await dispatch(registerUser(userData));

    if (registerUser.fulfilled.match(resultAction)) {
      console.log("User registered:", resultAction.payload.user);
      setSuccessMsg("Registration successful!"); // رسالة نجاح
    } else {
      console.error("Registration failed:", resultAction.payload?.msg);
      setSuccessMsg("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="login-form-box">
          <button className="close-button" onClick={toggle}>
            &times;
          </button>
          <img src={logo} alt="logo" className="login-logo" />
          <form className="div-form" onSubmit={handleSubmit(registerHandler)}>
            <h2>Create Account</h2>

            <div className="form-group">
              <input
                type="text"
                placeholder="Enter your name..."
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="error">{errors.name.message}</p>}
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Enter your email..."
                {...register("email")}
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Enter your password..."
                {...register("password")}
              />
              {errors.password && (
                <p className="error">{errors.password.message}</p>
              )}
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm your password..."
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="error">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button type="submit" className="button">
              Register
            </button>

            {/* Server or success messages */}
            {msg && <p className="server-message">{msg}</p>}
            {successMsg && <p className="server-message">{successMsg}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
