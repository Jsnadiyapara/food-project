import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Burger from "../../assets/hero/hero-2.png";
import { Link } from "react-router-dom";

const Section1 = () => {
  return (
    <section className="hero_section">
      <Container>
        <Row>
          <Col lg={7} className="mb-5 mb-lg-0">
            <div className="position-relative">
              <img src={Burger} className="img-fluid" alt="Hero" />
              <div className="price_badge">
                <div className="badge_text">
                  <h4 className="h4_xs text-dark">Only</h4>
                  <h4 className="h3_lg text-dark">₹199</h4  >
                </div>
              </div>
            </div>
          </Col>
          <Col lg={5}>
            <div className="hero_text text-center">
              <h1 className="text-white">New Burger</h1>
              <h2 className="text-white">With Onion</h2>
              <h5 className="text-white">Welcome to Burger Haven Where Flavor Meets Satisfaction</h5>
              <p className="text-white pt-2 pb-4">
              At Burger Haven, we believe in creating the ultimate burger experience for our guests. Our passion for quality ingredients and exceptional service ensures every visit is memorable.
              </p>
              <Link to="/menu" className="btn order_now btn-danger">
                Order Now
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Section1;
