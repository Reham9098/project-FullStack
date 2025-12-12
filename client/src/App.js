import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "reactstrap"; //import the Reactstrap Components
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Profile from "./Components/Profile";
import Register from "./Components/Register";
import Login from "./Components/Login";
import AddProduct from "./Components/AddProduct";
import Catalog from "./Components/Catalog"
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import ManageProducts from"./Components/ManageProducts";
import UpdateProduct from "./Components/UpdateProduct";
import UserOrder from "./Components/Orders";
import CustOrders from "./Components/AdminOrders";
import AboutUs from "./Components/AboutUs";


const App = () => {
  return (
    <Container fluid>
      <Router>
        <Row>
              <Header />
        </Row>
        <Row className="main">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/register" element={<Register  />}></Route>
            <Route path="/AddProduct" element={<AddProduct  />}></Route>  
            <Route path="/Catalog" element={<Catalog  />}></Route>
            <Route path="/cart" element={<Cart />}></Route> 
            <Route path="/checkout" element={<Checkout />}></Route>
            <Route path="/ManageProducts" element={<ManageProducts />}></Route>
            <Route path="/update-product/:id" element={<UpdateProduct />} />
            <Route path="/OrderHistory" element={<UserOrder />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/Orders" element={<CustOrders />} />
             
              
            
          </Routes>
        </Row>
        <Row>
          <Footer />
        </Row>
      </Router>
    </Container>
  );
};

export default App;

