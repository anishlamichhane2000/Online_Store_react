import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINT } from '../api';
import { useCart } from './CartContext';
import './ProductDetailsPage.css';

function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_ENDPOINT}/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching product details');
        setLoading(false);
      });
  }, [id]);

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="product-details-container">
      <div className="product-details-left">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-details-right">
        <div className="product-details-content">
          <h1>{product.title}</h1>
          <p className="Productprice">Price: ${product.price}</p>
          <p>{product.description}</p>
        </div>
        {/* Add to Cart button */}
        <button onClick={handleAddToCart}>Add to Cart</button>
        <Link to={`/cart`}><br></br> 
          <button >Go to Cart</button>
        </Link>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
