//HomePage.jsx
// HomePage.jsx
import { useEffect, useState } from 'react';

const HomePage = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    fetch('https://api.quotable.io/random')
      .then(res => res.json())
      .then(data => setQuote(data.content))
      .catch(err => console.error('Failed to fetch quote:', err));
  }, []);

  return (
    <div className="homepage-container">
      <div className="image-wrapper">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
          alt="Squeaky clean house"
          className="clean-house-image"
        />
        <div className="quote-overlay top">
          <h2 className="quote-heading">" {quote} "</h2>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

