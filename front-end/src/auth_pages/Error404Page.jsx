import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Error404Page = () => {
  const navigate = useNavigate();

  // 2-second delay before redirecting to homepage
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 2000); 
    
    // cleanup timer on unmount
    return () => clearTimeout(timer); 
  }, [navigate]);

  return (
    <div className="p-8 text-center">
      <h2 className="text-4xl font-bold">404 - Page Not Found</h2>
      <p className="text-lg mt-2">Redirecting to the homepage...</p>
    </div>
  );
};

export default Error404Page;
