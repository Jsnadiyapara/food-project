import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pizza from "../../assets/about/pizza.png";
import Salad from "../../assets/about/salad.png";
import Delivery from "../../assets/about/delivery-bike.png";

// Mock Data Cards
const mockData = [
  {
    image: Pizza,
    name: "Original",
    desc: `At Original Eats, our mission is to honor the rich traditions of culinary craftsmanship by offering dishes that are true to their root`,
  },
  {
    image: Salad,
    name: "Qualty Foods",
    desc: `Eating quality food isn’t just about taste—it's about nourishing your body, supporting ethical practices, and making sustainable choices.`,
  },
  {
    image: Delivery,
    name: "Fastest Delivery",
    desc: `Craving something delicious? Our network of partner restaurants ensures that you get your favorite meals delivered hot and fresh, right when you want them.`,
  },
  // Add more mock data objects as needed
];

function Section2() {
  return (
    <>
      <section className="about_section">
        <Container>
          <Row>
            <Col lg={{ span: 8, offset: 2 }} className="text-center">
              <h2>The burger tastes better when you eat it with your family</h2>
             
              <Link to="/menu" className="btn order_now btn-danger mt-5">
                Explore Full Menu
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="about_wrapper">
        <Container>
          <Row className="justify-content-md-center">
            {mockData.map((cardData, index) => (
              <Col md={6} lg={4} className="mb-4 mb-md-0" key={index}>
                <div className="about_box text-center">
                  <div className="about_icon">
                    <img
                      src={cardData.image}
                      className="img-fluid"
                      alt="icon"
                    />
                  </div>
                  <h4>{cardData.name}</h4>
                  <p>{cardData.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Section2;
