import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRouteAdmin = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Appel backend pour vérifier le rôle (token via cookie)
    axios.get('https://gestion-de-stock-vape-shop-api.vercel.app/api/auth/me', { withCredentials: true })
      .then(res => {
        const user = res.data;
        if (user.role === 'admin') {
          setIsAdmin(true);
        }
      })
      .catch(() => {
        setIsAdmin(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Chargement...</div>; // ou un spinner
  }

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRouteAdmin;
