import React, { useEffect, useState } from "react";
import { Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../../context/cart.js";

// Function to render star icons based on rating
const renderRatingIcons = (rating) => {
  const fullStars = Math.floor(rating); // Number of full stars
  const decimalPart = rating - fullStars; // Decimal part of the rating

  const stars = [];
  // Render full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<i key={i} className="bi bi-star-fill"></i>);
  }
  // Render half star if the decimal part is >= 0.5
  if (decimalPart >= 0.5) {
    stars.push(<i key={fullStars} className="bi bi-star-half"></i>);
  }
  return stars;
};

function Cards({ id, more, Image, rating, name, desc, price }) {
  const [stars, setStars] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    setStars(renderRatingIcons(rating));
  }, [rating]);

  const handleAddToCart = () => {
    const item = { id, name, Image, rating, desc, price };
    addToCart(item);
  };

  return (
    <Col sm={12} md={6} lg={4} xl={3} className="mb-4">
      <Card className="h-100 border border-primary border-2">
        <div className="overflow-hidden">
          <Card.Img 
            variant="top" 
            src={Image} 
            alt={name} 
            className="card-img-top img-fluid" 
          />
        </div>
        <Card.Body>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div className="d-flex align-items-center">
              {stars}
            </div>
            <Button variant="outline-danger" aria-label="Add to wishlist">
              <i className="bi bi-heart"></i>
            </Button>
          </div>
          <Card.Title className="text-danger mb-2 text-truncate">{name}</Card.Title>
          <Card.Text className="text-muted text-truncate">{desc}</Card.Text>
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="mb-0 text-primary">Price: ₹{price}</h5>
            <Button onClick={handleAddToCart} variant="primary">
              Add to Cart
            </Button>
          </div>
        </Card.Body>
        <Card.Footer>
          <Link to={`/${more}`} className="btn btn-primary w-100">
            More Details
          </Link>
        </Card.Footer>
      </Card>
    </Col>
  );
}

export default Cards;
