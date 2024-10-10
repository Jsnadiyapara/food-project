import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import PromotionImage from "../../assets/promotion/pro.png";

function Section4() {
  return (
    <>
      <section className="promotion_section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="text-center mb-5 mb-lg-0">
              <img src={PromotionImage} className="img-fluid" alt="Promotion" />
            </Col>
            <Col lg={6} className="px-5">
              <h2>Nothing brings people together like a good burger</h2>
              <p>
              At Tasty Burger Haven, we believe that a great burger isn't just about taste; it's about the experience. Since our founding, we've been dedicated to serving up the juiciest, most flavorful burgers in town, using only the freshest, highest-quality ingredients.
              </p>
              <ul>
                <li>
                  <p>
                  Best burgers in town! Always fresh and delicious
                  </p>
                </li>
                <li>
                  <p>I love their commitment to quality and community. It makes every visit special.</p>
                </li>
                <li>
                  <p>
                  Their variety is amazing. There's always something new to try!
                  </p>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      {/* BG Parallax Scroll */}
      <section className="bg_parallax_scroll"></section>
    </>
  );
}

export default Section4;
