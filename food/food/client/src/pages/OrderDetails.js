import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';


import { useCart } from '../context/cart';
import { Button, Container, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { AiOutlinePlus, AiOutlineMinus, AiOutlineDelete } from 'react-icons/ai';

const OrderDetails = () => {
  const { cart, setCart, removeFromCart } = useCart();
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalAmount(total);
  }, [cart]);

  const handleQuantityChange = (itemId, change) => {
    setCart((prevCart) => prevCart.map((item) =>
      item.id === itemId
        ? { ...item, quantity: Math.max(item.quantity + change, 1) }
        : item
    ));
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const handleProceedToPayment = () => {
    navigate('/bill-details');
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Order Details</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ListGroup>
          {cart.map((item) => (
            <ListGroup.Item key={item.id} className="mb-3">
              <Row className="align-items-center">
                <Col md={2}>
                  <Image src={item.Image} alt={item.name} fluid rounded />
                </Col>
                <Col md={4}>
                  <h5>{item.name}</h5>
                  <p className="text-muted">{item.desc}</p>
                  <p><strong>Price:</strong> ₹{item.price}</p>
                </Col>
                <Col md={3} className="d-flex justify-content-center align-items-center">
                  <Button
                    variant="outline-secondary"
                    onClick={() => handleQuantityChange(item.id, -1)}
                    disabled={item.quantity <= 1}
                    aria-label="Decrease quantity"
                    className="me-2"
                  >
                    <AiOutlineMinus />
                  </Button>
                  <span className="mx-2"><strong>{item.quantity}</strong></span>
                  <Button
                    variant="outline-secondary"
                    onClick={() => handleQuantityChange(item.id, 1)}
                    aria-label="Increase quantity"
                    className="ms-2"
                  >
                    <AiOutlinePlus />
                  </Button>
                </Col>
                <Col md={2} className="text-end">
                  <Button
                    variant="outline-danger"
                    onClick={() => handleRemoveItem(item.id)}
                    aria-label="Remove item"
                  >
                    <AiOutlineDelete />
                  </Button>
                </Col>
               
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      {cart.length > 0 && (
        <Card className="mt-4">
          <Card.Body className="text-center">
            <h3>Total Amount: ₹{totalAmount}</h3>
            <Button
              variant="primary"
              onClick={handleProceedToPayment}
              className="mt-3"
              aria-label="Proceed to Payment"
            >
              Proceed to Payment
            </Button>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default OrderDetails;
