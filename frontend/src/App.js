import React, { useState, useEffect }from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import PrivateRouteAdmin from './config/PrivateRouteAdmin';
import PrivateRoute from './config/PrivateRoute';
import PublicRoute from './config/PublicRoute';
import Vape from './pages/admin/Vape';
import Liquide from './pages/admin/Liquide';
import Accessoire from './pages/admin/Accessoire';
import Service from './pages/admin/Service';
import ProduitLiquide from './pages/admin/ProduitLiquide';
import Employe from './pages/admin/Employe';
import Home from './pages/employe/Home';
import Finance from './pages/admin/Finance';
import HistoriqueVente from './pages/admin/HistoriqueVente';
import NoInternet from './pages/NoInternet';
function App() {
   const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

    if (!isOnline) {
    return <NoInternet/>
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={
         <PublicRoute>
          <Login />
          </PublicRoute>
        }
           />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRouteAdmin>
              <Dashboard />
            </PrivateRouteAdmin>
          }
        />
        <Route
          path="/admin/vape"
          element={
            <PrivateRouteAdmin>
              <Vape />
            </PrivateRouteAdmin>
          }
        />
        <Route
          path="/admin/service"
          element={
            <PrivateRouteAdmin>
              <Service />
            </PrivateRouteAdmin>
          }
        />
        <Route
          path="/admin/accessoire"
          element={
            <PrivateRouteAdmin>
              <Accessoire />
            </PrivateRouteAdmin>
          }
        />
        <Route
          path="/admin/produit-liquide"
          element={
            <PrivateRouteAdmin>
              <ProduitLiquide />
            </PrivateRouteAdmin>
          }
        />
        <Route
          path="/admin/liquide"
          element={
            <PrivateRouteAdmin>
              <Liquide />
            </PrivateRouteAdmin>
          }
        />
        <Route
          path="/admin/employe"
          element={
            <PrivateRouteAdmin>
              <Employe />
            </PrivateRouteAdmin>
          }
        />
         <Route
          path="/admin/finance"
          element={
            <PrivateRouteAdmin>
              <Finance />
            </PrivateRouteAdmin>
          }
        />
        <Route
          path="/admin/historique-ventes"
          element={
            <PrivateRouteAdmin>
              <HistoriqueVente />
            </PrivateRouteAdmin>
          }
        />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
              
           
          }
        />
      </Routes>
    </Router>
  );
}


export default App;
