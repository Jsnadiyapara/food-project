import React from 'react';
import { useCart } from '../context/cart';
import { Button } from 'react-bootstrap';

const Product = ({ item }) => {
  const { addToCart } = useCart();  // Access addToCart from CartContext

  const handleAddToCart = () => {
    addToCart(item);  // Call addToCart to add the item to the cart
  };

  return (
    <div className="product">
      <h2>{item.name}</h2>
      <p>Price: ₹{item.price}</p>
      <Button onClick={handleAddToCart}>Add to Cart</Button>
    </div>
  );
};

export default Product;
