import React, { useContext } from 'react';
import { GlobalState } from '../../GlobalState';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.UserApi.cart;
  const [count, setCount] = state.UserApi.count;

  const handleAdd = (productId) => {
    setCart(cart.map(product => 
      product._id === productId 
        ? { ...product, quantity: product.quantity + 1 } 
        : product
    ));
    setCount(count + 1);
  };

  const handleMinus = (productId) => {
    setCart(cart.map(product => 
      product._id === productId && product.quantity > 1
        ? { ...product, quantity: product.quantity - 1 } 
        : product
    ));
    setCount(count - 1);
  };

  if (cart.length === 0) return <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Cart is Empty</h2>;

  return (
    <div>
      {cart.map(product => (
        <div key={product.product._id} className='detail-card'>
          <img src={product.product.images.url} alt='' />
          <div className='box-detail'>
            <div className='row'>
              <h2>{product.product.title}</h2>
            </div>
            <span>Rs {product.product.price}</span>
            <p>{product.product.description}</p>
            <p>{product.product.content}</p>
            <p>
              Product Quantity:
              <button onClick={() => handleAdd(product.product._id)}>+</button>
              {count}
              <button onClick={() => handleMinus(product.product._id)}>-</button>
            </p>
            <p>Sold: {product.product.sold}</p>
            <div className='row-btn'>
              <Link to='/login' className='cart'>Buy Now</Link>
              <Link to='/cart' className='cart'>Delete</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
