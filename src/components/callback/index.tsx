import type React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useToken from '../../hooks/useToken';

const Callback: React.FC = () => {
  const { setToken } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    const tokenParams = hash.substring(1).split('&').reduce((acc, current) => {
      const [key, value] = current.split('=');
      acc[key] = value;
      return acc;
    }, {} as { [key: string]: string });

    const token = tokenParams.access_token;
    const expiresIn = tokenParams.expires_in ? Number.parseInt(tokenParams.expires_in) : undefined;

    if (token && expiresIn) {
      setToken(token, expiresIn);
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [setToken, navigate]);

  return null;
};

export default Callback;
