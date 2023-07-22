import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINT } from '../api';
import './SearchPage.css';

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);

    axios.get(`${API_ENDPOINT}/products?title=${searchQuery}`)
      .then((response) => {
        setSearchResults(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching search results');
        setLoading(false);
      });
  };

  const handleBack = () => {
    window.location.href = '/';
  };

  return (
    <div className="search-page-container">
      <button className="btn-back" onClick={handleBack}>
        Back
      </button>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a product"
        />
        <button type="submit">Search</button>
      </form>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      <ul>
        {searchResults.map((product) => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.title} />
              <p>{product.title}</p>
              <p className="price">Price: ${product.price}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchPage;