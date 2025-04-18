import { useEffect, useState } from 'react';
import { get_random_quote } from '../endpoints/thirdparty_api'; 

const HomePage = () => {
  // state to store the quote text and author
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  // runs fetchQuote from 3rd party API once when the component mounts
  useEffect(() => {
    const fetchQuote = async () => {
      const quoteData = await get_random_quote();
      if (quoteData) {
        setQuote(quoteData.quote);
        setAuthor(quoteData.author);
      }
    };
    // empty dependency array ensures this only runs once on mount
    fetchQuote();
  }, []);

  return (
    <div className="home-wrapper">
      <div className="image-banner">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
          alt="Squeaky clean house"
          className="hero-image"
        />
        <div className="quote-box">
          <h2 className="quote-text">" {quote} "</h2>
          <p className="quote-author">— {author}</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;