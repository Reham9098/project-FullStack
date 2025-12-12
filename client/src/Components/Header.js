import { useState } from "react";
import { Navbar, Nav, NavItem } from "reactstrap";
import logo from "../Images/logo.png";
import profileImage from "../Images/usericon.jpeg";
import cartImage from "../Images/carticon.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Features/UserSlice";
import Login from "./Login";
import Register from "./Register";
import Location from './Location';
import "./Header.css"; 

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const cart = useSelector((state) => state.cart.cart);
  const totalItems = cart?.products?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const isAdmin = user?.email === "Admin@gmail.com";

  return (
    <>
      <Navbar
        className="header d-flex justify-content-between align-items-center px-3"
      >
        <Nav className="d-flex align-items-center gap-3">
          <NavItem>
            <Link to="/">
              <img src={logo} className="logo" alt='Company logo'/>
            </Link>
          </NavItem>

          <NavItem>
            <Link to="/">Home</Link>
          </NavItem>
          <NavItem>
            <Link to="/AboutUs">AboutUs</Link>
          </NavItem>

          {!user ? (
            <>
              <NavItem>
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowRegisterModal(true);
                  }}
                  className="nav-link"
                >
                  Sign up
                </Link>
              </NavItem>
              <NavItem>
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowLoginModal(true);
                  }}
                  className="nav-link"
                >
                  Login
                </Link>
              </NavItem>
            </>
          ) : (
            <>
              {isAdmin && (
                <>
                  <NavItem>
                    <Link to="/AddProduct">Add Product</Link>
                  </NavItem>
                  <NavItem>
                    <Link to="/ManageProducts">Manage Products</Link>
                  </NavItem>
                  <NavItem>
                    <Link to="/Orders">Orders</Link>
                  </NavItem>
                </>
              )}

              {!isAdmin && (
                <>
                  <NavItem>
                    <Link to="/Catalog">Catalog</Link>
                  </NavItem>
                  <NavItem>
                    <Link to="/OrderHistory">My Orders</Link>
                  </NavItem>
                  <NavItem className="position-relative">
                    <Link to="/cart" className="d-flex align-items-center gap-1">
                      Cart
                      {totalItems > 0 && (
                        <span
                          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark"
                          style={{ fontSize: "10px" }}
                        >
                          {totalItems}
                        </span>
                      )}
                    </Link>
                  </NavItem>
                </>
              )}
            </>
          )}
        </Nav>

        {user && (
          <div className="position-relative">
            <div
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="d-flex align-items-center gap-2"
              style={{ cursor: "pointer", color: "white" }}
            >
              <img
                src={profileImage}
                alt="User"
                width="35"
                height="35"
                className="rounded-circle"
              />
              <span>{user.name}</span>
              <span style={{ fontSize: "1.2rem" }}>⌄</span>
            </div>

            {dropdownOpen && (
              <div
                className="position-absolute bg-white shadow p-3 rounded"
                style={{ top: "100%", right: 0, zIndex: 10, minWidth: "220px" }}
              >
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={profileImage}
                    alt="Profile"
                    width="40"
                    height="40"
                    className="rounded-circle me-2"
                  />
                  <div>
                    <strong>{user.name}</strong>
                    <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                      {user.email}
                    </div>
                  </div>
                </div>
                <div>
                  <Location />
                </div>
                <button
                  className="btn btn-outline-danger btn-sm w-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </Navbar>

      {/* المودالات */}
      <Login isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      <Register isOpen={showRegisterModal} toggle={() => setShowRegisterModal(false)} />
    </>
  );
};

export default Header;
