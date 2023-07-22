import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import './ShoppingCart.css';

function ShoppingCart() {
  const { cartItems, removeFromCart, cartTotal } = useCart();

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <div className="cart-item">
                <img src={item.image} alt={item.title} />
                <div className="item-details">
                  <p>{item.title}</p>
                  <p>Price: ${item.price}</p>
                </div>
                <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && <p className='Totalprice'>Total: ${cartTotal}</p>}<br></br>

      {/* Continue Shopping button */}
      <Link to={"/"}>
        <button>Continue Shopping</button>
      </Link>
    </div>
  );
}

export default ShoppingCart;
