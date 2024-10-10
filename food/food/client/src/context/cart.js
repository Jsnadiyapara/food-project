import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the CartContext
const CartContext = createContext();

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);

// CartProvider component that provides the cart and user details to its children
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Get cart from localStorage or initialize to an empty array
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [user, setUser] = useState(() => {
    // Get user from localStorage or initialize to an empty object
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : { username: 'Guest' };
  });

  useEffect(() => {
    // Update localStorage whenever the cart or user changes
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('user', JSON.stringify(user));
  }, [cart, user]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const itemExists = prevCart.find((cartItem) => cartItem.id === item.id);

      if (itemExists) {
        // If item exists, update the quantity
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // If item does not exist, add it to the cart with quantity 1
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const updateItemQuantity = (itemId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  // Function to set the user's details
  const setUserDetails = (username) => {
    setUser({ username });
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, updateItemQuantity, user, setUserDetails }}>
      {children}
    </CartContext.Provider>
  );
};
