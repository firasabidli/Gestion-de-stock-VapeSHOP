import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Overview from '../components/Overview';
import StockChart from '../components/StockChart';

import LineVenteChart from '../components/LineVenteChart';
import RevenuDepenseChart from '../components/RevenuDepenseChart ';


const Dashboard = () => {
  const [isSidebarActive, setSidebarActive] = useState(false);
  const [produits, setProduits] = useState([]);
  const toggleSidebar = () => {
    setSidebarActive(prev => !prev);
  };
 const fetchAccessoires = async () => {
    try {
     const response = await axios.get('https://gestion-de-stock-vape-shop-api.vercel.app/api/statistiques/nbProduits', {
       withCredentials: true,
    });
      setProduits(response.data);
    } catch (err) {
      console.error('Erreur lors du chargement des accessoires', err);
    }
  };

  useEffect(() => {
    fetchAccessoires();
  }, []);
  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <section className="main">
        <Sidebar isActive={isSidebarActive} />
        <div className={`main--content ${isSidebarActive ? 'active' : ''}`}>
          <Overview  produits={produits}/>
          <StockChart data={produits} />
          <LineVenteChart/>
          <RevenuDepenseChart/>
        
        </div>
      </section>
    </>
  );
};

export default Dashboard;
