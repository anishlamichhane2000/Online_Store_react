import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINT } from '../api';
import './HomePage.css';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${API_ENDPOINT}/products`)
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching products');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="home-page-container">
      <div className="home-page-header">
        <h1>Asgard Store</h1>
        <div className="nav-buttons-container">
          <Link to="/cart" className="cart-button">
            Cart
          </Link>
          <Link to="/search" className="search-button">
            Search
          </Link>
        </div>
      </div>
      <ul className="products-list">
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.title} className="product-image" />
              <p className="product-title">{product.title}</p>
              <p className="product-price">Price: ${product.price}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;