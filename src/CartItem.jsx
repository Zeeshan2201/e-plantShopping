import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = (props) => {
  const cartItems = useSelector((state) => state.cart.items); // Get cart items from Redux store
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (parseFloat(item.cost.replace('$', '')) * item.quantity), 0);
  };

  const calculateTotalCost = (item) => {
    return parseFloat(item.cost.replace('$', '')) * item.quantity;
  };

  const handleIncrement = (item) => {
    const newQuantity = item.quantity + 1;
    dispatch(updateQuantity({ name: item.name, quantity: newQuantity }));
  };

  const handleDecrement = (item) => {
    if (item.quantity === 1) {
      dispatch(removeItem(item.name)); // Remove item from cart if quantity is 1
    } else {
      const newQuantity = item.quantity - 1;
      dispatch(updateQuantity({ name: item.name, quantity: newQuantity }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name)); // Remove item from cart
  };

  const handleContinueShopping = () => {
    props.onContinueShopping(); // Call the parent component's continue shopping function
  };

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0); // Calculate total quantity of items

  return (
    <div className="cart-items-container">
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div>
            {cartItems.map((item) => (
              <div className="cart-item" key={item.name}>
                <img src={item.image} alt={item.name} />
                <div>{item.name}</div>
                <div>{item.cost}</div>
                <div>Quantity: {item.quantity}</div>
                <div>Total: ${calculateTotalCost(item)}</div>
                <button onClick={() => handleDecrement(item)}>-</button>
                <button onClick={() => handleIncrement(item)}>+</button>
                <button onClick={() => handleRemove(item)}>Remove</button>
              </div>
            ))}
          </div>
          <div>
            <h3>Total Amount: ${calculateTotalAmount()}</h3>
            <button onClick={handleContinueShopping}>Continue Shopping</button>
            <button onClick={() => alert('Checkout functionality coming soon!')}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;
