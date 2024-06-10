import React, {FC,  useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface CallbackProps {
  setToken: (token: string) => void;
}

const Callback: FC<CallbackProps> = ({ setToken }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    const tokenParam = hash.substring(1).split('&').find(elem => elem.startsWith('access_token'));
    const token = tokenParam ? tokenParam.split('=')[1] : null;

    if (token) {
      window.localStorage.setItem('token', token);
      setToken(token);
      navigate('/');
    } else {
      navigate('/login');
    }
  }, []);

  return null;
};

export default Callback;
