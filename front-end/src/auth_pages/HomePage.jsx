import { useEffect, useState } from 'react';
import { get_random_quote } from '../endpoints/other_api'; // adjust the path if needed

const HomePage = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    const fetchQuote = async () => {
      const quoteData = await get_random_quote();
      if (quoteData) {
        setQuote(quoteData.quote);
        setAuthor(quoteData.author);
      }
    };

    fetchQuote();
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
          <p className="quote-author visible-author">— {author}</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
