import { Row, Col, Container } from "reactstrap";
import { motion } from "framer-motion";
import plantImage from "../Images/home.jpg"; // ضع هنا مسار الصورة
import "./Home.css";

const Home = () => {
  return (
    <Container className="home-section py-5">
      <Row className="align-items-center">
        {/* النص على اليسار */}
        <Col md={6} className="px-5">
          <motion.h1
            className="text-success fw-bold"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            Welcome to Plantify!
          </motion.h1>
          <motion.p
            className="text-secondary fs-5 mt-3"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
          >
            Discover our beautiful collection of plants that bring life and freshness
            to your home. We provide healthy, carefully nurtured plants that will
            brighten your space and purify your air.
          </motion.p>
        </Col>

        {/* الصورة على اليمين مع الخلفية */}
        <Col md={6} className="position-relative">
          <div className="green-rectangle"></div>
          <motion.img
            src={plantImage}
            alt="Plant"
            className="img-fluid position-relative home-plant-image"
            initial={{ opacity: 0, x: 150 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
