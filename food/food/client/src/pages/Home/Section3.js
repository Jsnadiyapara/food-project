import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Cards from "../../components/Layouts/Cards";
import { Link } from "react-router-dom";


// Rating Logical Data
const renderRatingIcons = (rating) => {
  console.log(rating)
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (rating > 0.5) {
      stars.push(<i key={i} className="bi bi-star-fill"></i>);
      rating--;
    } else if (rating > 0 && rating < 1) {
      stars.push(<i key={i} className="bi bi-star-half"></i>);
      rating--;
    } else {
      stars.push(<i key={i} className="bi bi-star"></i>);
    }
  }
  return stars;
};


function Section3() {
  const [mockData, setmockData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/food").then((data) => {
      return data.json()
    }).then((d) => {
      setmockData(d)
    })

  }, [])
  return (
    <section className="menu_section">
      <Container>
        <Row>
          <Col lg={{ span: 8, offset: 2 }} className="text-center mb-5">
            <h2>OUR CRAZY BURGERS</h2>
            <p className="para text-primary">
            Our menu is designed to satisfy all your burger cravings, from classic favorites to innovative new creations. Dive into our diverse selection and find your new favorite today!
            </p>
          </Col>
        </Row>
        <Row>
          {mockData?.map((cardData) => (
            <Cards
             key={cardData.fid} // Ensure each card has a unique key
              id={cardData.fid}
              Image={cardData.Image}
              rating={cardData.Rating}
              name={cardData.name}
              desc={cardData.desc}
              price={cardData.price}
              renderRatingIcons={renderRatingIcons}
              more={cardData.fid}
            />
          ))}
        </Row>
        

        <Row className="pt-5">
          <Col sm={6} lg={5}>
            <div className="ads_box ads_img1 mb-5 mb-md-0">
              <h4 className="mb-0">GET YOUR FREE</h4>
              <h5>CHEESE FRIES</h5>
              <Link to="/" className="btn btn_red px-4 rounded-0">
                Learn More
              </Link>
            </div>
          </Col>
          <Col sm={6} lg={7}>
            <div className="ads_box ads_img2">
              <h4 className="mb-0">GET YOUR FREE</h4>
              <h5>CHEESE FRIES</h5>
              <Link to="/" className="btn btn_red px-4 rounded-0">
                Learn More
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Section3;
