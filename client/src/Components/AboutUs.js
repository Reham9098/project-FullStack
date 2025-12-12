// AboutUs.jsx
import { motion } from "framer-motion";
import { Row, Col } from "reactstrap";
import plantImage from "../Images/aboutus.jpg"; // ضع هنا صورة للنبتة أو المشهد الطبيعي
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-section py-5">
      <Row className="align-items-center">
        {/* About Us Text */}
        <Col md={6} className="px-5">
          <motion.h2
            role="title"
            className="text-success fw-bold"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
          >
            About Plantify
          </motion.h2>
          <motion.p
            role="text"
            className="text-secondary fs-5 mt-3"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.4 }}
          >
            Plantify is your go-to store for beautiful, healthy plants that bring life
            and freshness to your home. We carefully nurture each plant to ensure
            exceptional quality, helping you create a green, vibrant, and relaxing space.
          </motion.p>
        </Col>

        {/* Plant Image with subtle background shape */}
        <Col md={6} className="position-relative">
          <div className="green-rectangle"></div>
          <motion.img
            src={plantImage}
            alt="Plant"
            className="img-fluid position-relative about-plant-image"
            initial={{ opacity: 0, x: 150 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default AboutUs;
