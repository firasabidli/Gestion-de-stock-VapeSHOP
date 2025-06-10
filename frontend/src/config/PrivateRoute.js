import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    axios.get('https://gestion-de-stock-vape-shop-api.vercel.app/api/auth/me', { withCredentials: true })
      .then(res => {
        const user = res.data;
        if (user.role === 'vendeur' || user.role === 'admin') {
          setAuthorized(true);
        }
      })
      .catch(() => {
        setAuthorized(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!authorized) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
