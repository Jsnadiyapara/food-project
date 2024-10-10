import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo/logo.png";
import Cookies from 'js-cookie';
import { useAuth } from "../../context/auth.js";
import { useCart } from "../../context/cart.js";
import "../../styles/HeaderStyle.css";

const Header = () => {
  const [nav, setNav] = useState(false);
  const [auth, setAuth] = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const isAuthenticated = !!Cookies.get('backend_token'); // Check if the token exists

  const handleLogout = () => {
    Cookies.remove('backend_token');
    setAuth(null);
    navigate('/login');
  };

  // Scroll Navbar
  const changeValueOnScroll = () => {
    const scrollValue = document?.documentElement?.scrollTop;
    scrollValue > 100 ? setNav(true) : setNav(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeValueOnScroll);
    return () => {
      window.removeEventListener("scroll", changeValueOnScroll);
    };
  }, []);

  const handleCartClick = () => {
    navigate('/order-details');
  };

  return (
    <header>
      <Navbar collapseOnSelect expand="lg" className={`${nav === true ? "sticky" : ""}`}>
        <Container>
          <Navbar.Brand>
            <Link to="/" className="logo">
              <img src={Logo} alt="Logo" className="img-fluid" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                About
              </Nav.Link>
              <Nav.Link as={Link} to="/menu">
                Our Menu
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
                Contact
              </Nav.Link>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
              {isAuthenticated ? (
                <Nav.Link onClick={handleLogout}>
                  Logout
                </Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              )}
              <Nav.Link onClick={handleCartClick}>
                <div className="cart">
                  <i className="bi bi-bag me-3 "></i>
                  <em className="roundpoint">{cart.length}</em>
                </div>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
