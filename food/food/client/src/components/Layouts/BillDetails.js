import React from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { useCart } from '../../context/cart.js';

const BillDetails = () => {
    const { cart, user } = useCart();

    // Calculate total amount
    const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">Invoice</h1>
            
            <Row className="mb-4">
                <Col>
                    <h5><strong>Customer:</strong> {user.username}</h5> {/* Display the username */}
                    <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Table striped bordered hover className="mt-4">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Price per Item (₹)</th>
                                <th>Total (₹)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item, index) => (
                                <tr key={item.id}> {/* Use item.id instead of index */}
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price}</td>
                                    <td>{item.price * item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="4" className="text-end"><strong>Total Amount:</strong></td>
                                <td><strong>₹{totalAmount}</strong></td>
                            </tr>
                        </tfoot>
                    </Table>
                </Col>
            </Row>

            <Row className="mt-5">
                <Col>
                    <h4 className="text-center mb-4">Choose a Payment Method:</h4>
                    <div className="d-flex justify-content-center">
                        <Button variant="outline-primary" className="me-3">
                            <img src="https://cdn-icons-png.flaticon.com/512/6124/6124998.png" alt="Google Pay" style={{ width: '50px' }} />
                        </Button>
                        <Button variant="outline-primary" className="me-3">
                            <img src="https://www.logo.wine/a/logo/PhonePe/PhonePe-Logo.wine.svg" alt="Paytm" style={{ width: '50px' }} />
                        </Button>
                        <Button variant="outline-primary">
                            <img src="https://cdn-icons-png.flaticon.com/512/6963/6963703.png" alt="Credit Card" style={{ width: '50px' }} />
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default BillDetails;
