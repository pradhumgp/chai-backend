import { LoginCallback } from '@okta/okta-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const CustomLoginCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/'); // Redirect to home if an error occurs
    }, 2000); // Adjust time as needed
    return () => clearTimeout(timer);
  }, [navigate]);

  return <LoginCallback errorComponent={() => navigate('/')} />;
};

export default CustomLoginCallback;