import React, { useEffect, useState } from 'react';

import Navbar from '../components/Navbar';
import './Home.css'; // ou le bon chemin vers ton fichier CSS
import vapeIcon from '../../assets/img/vape.png';
import liquideIcon from '../../assets/img/liquide.png';
import accessoireIcon from '../../assets/img/accessoire.png';
import serviceIcon from '../../assets/img/service.png';
import fruiteIcon from '../../assets/img/fruite.jpeg';
import gourmandIcon from '../../assets/img/gourmand.png';
import fruiteBIcon from '../../assets/img/fruiteB.jpg';
import gourmandBIcon from '../../assets/img/gourmandB.jpg';
import VenteVapeModal from './vente/VenteVapeModal';
import VenteLiquideBFModal from './vente/VenteLiquideBFModal';
import VenteLiquideBGModal from './vente/VenteLiquideBGModal';
import VenteLiquideDFModal from './vente/VenteLiquideDFModal';
import VenteLiquideDGModal from './vente/VenteLiquideDGModal';
import VenteAccessoireModal from './vente/VenteAccessoireModal';
import ServiceModal from './vente/ServiceModal';
import axios from 'axios';
import Clock from '../components/Clock';

const Home = () => {
 const [showVapeModal, setShowVapeModal] = useState(false);
 const [showLiquideModal, setShowLiquideModal] = useState(false);
 const [showAccessoireModal, setShowAccessoireModal] = useState(false);
 const [showServiceModal, setShowServiceModal] = useState(false);
 const [showLiquideBFModal, setShowLiquideBFModal] = useState(false);
 const [showLiquideBGModal, setShowLiquideBGModal] = useState(false);
 const [showLiquideDFModal, setShowLiquideDFModal] = useState(false);
 const [showLiquideDGModal, setShowLiquideDGModal] = useState(false);
    const [vapes, setVapes] = useState([]);
     const [services, setServices] = useState([]);
    const [accessoires, setAccessoires] = useState([]);
    const [allLiquides, setAllLiquides] = useState([]);
    const [liquideFruite, setLiquideFruite] = useState([]);
    const [liquideGourmand, setLiquideGourmand] = useState([]);
    const [gourmandDose, setGourmandDose] = useState([]);
    const [fruiteDose, setFruiteDose] = useState([]);

const fetchServices = async () => {
    try {
         const response = await axios.get('https://gestion-de-stock-vape-shop-api.vercel.app/api/services', {
      withCredentials: true,
    });
      setServices(response.data);
    } catch (err) {
      console.error('Erreur lors du chargement des services', err);
    }
  };
const fetchLiquide = async () => {
  try {
    
    const response = await axios.get('https://gestion-de-stock-vape-shop-api.vercel.app/api/liquides/filter', {
      withCredentials: true,
    });

    const {
      liquides,
      fruiteDose,        
      fruiteBouteille,    
      gourmandDose,         
      gourmandBouteille 
    } = response.data;

    setAllLiquides(liquides);
    setLiquideFruite(fruiteBouteille);
    setLiquideGourmand(gourmandBouteille);
    setFruiteDose(fruiteDose);
    setGourmandDose(gourmandDose);

  } catch (err) {
    console.error('Erreur lors du chargement des liquides', err);
  }
};

const fetchAccessoires = async () => {
    try {
       
      const response = await axios.get('https://gestion-de-stock-vape-shop-api.vercel.app/api/accessoires', {
      withCredentials: true,
    });
      setAccessoires(response.data);
    } catch (err) {
      console.error('Erreur lors du chargement des accessoires', err);
    }
  };
const fetchVapes = async () => {
    try {
       
      const response = await axios.get('https://gestion-de-stock-vape-shop-api.vercel.app/api/vapes', {
      withCredentials: true,
    });
      setVapes(response.data);
    } catch (err) {
      console.error('Erreur lors du chargement des vapes', err);
    }
  };

  useEffect(() => {
    fetchVapes();
    fetchLiquide();
    fetchAccessoires();
    fetchServices();
  }, []);
  return (
    <>
      <Navbar />
     
   <div class="overview">
                <sec-tion >
      <div className="contain-er">
        
        <Clock />
      </div>
    </sec-tion>
    <div class="car-ds">
                    <div class="card card-1" onClick={() => setShowVapeModal(true)}>
                        <div class="card--data">
                            <div class="card--content">
                                <h5 class="card--title">Vapes</h5>
                                <h1>152</h1>
                            </div>
                            <img src={vapeIcon} className="-icons" alt="Vape Icon" />
                        </div>
                        <div class="card--stats">
                            <span><i class="ri-bar-chart-fill card--icon stat--icon"></i>65%</span>
                            <span><i class="ri-arrow-up-s-fill card--icon up--arrow"></i>10</span>
                            <span><i class="ri-arrow-down-s-fill card--icon down--arrow"></i>2</span>
                        </div>
                    </div>
                    <VenteVapeModal show={showVapeModal} vapes={vapes} onHide={() => setShowVapeModal(false)} OnVente={fetchVapes} />

               
                    <div class="card card-3" onClick={() => setShowAccessoireModal(true)}>
                        <div class="card--data">
                            <div class="card--content">
                                <h5 class="card--title">Accessoires</h5>
                                <h1>102</h1>
                            </div>
                            <img src={accessoireIcon} className="-icons" alt="Accessoire Icon" />
                        </div>
                        <div class="card--stats">
                            <span><i class="ri-bar-chart-fill card--icon stat--icon"></i>27%</span>
                            <span><i class="ri-arrow-up-s-fill card--icon up--arrow"></i>31</span>
                            <span><i class="ri-arrow-down-s-fill card--icon down--arrow"></i>23</span>
                        </div>
                    </div>
                    <VenteAccessoireModal show={showAccessoireModal} accessoires={accessoires} onHide={() => setShowAccessoireModal(false)} OnVente={fetchAccessoires} />

                    <div class="card card-4" onClick={() => setShowServiceModal(true)}>
                        <div class="card--data">
                            <div class="card--content">
                                <h5 class="card--title">Services</h5>
                                <h1>15</h1>
                            </div>
                            <img src={serviceIcon} className="-icons" alt="service Icon" />
                        </div>
                        <div class="card--stats">
                            <span><i class="ri-bar-chart-fill card--icon stat--icon"></i>8%</span>
                            <span><i class="ri-arrow-up-s-fill card--icon up--arrow"></i>11</span>
                            <span><i class="ri-arrow-down-s-fill card--icon down--arrow"></i>2</span>
                        </div>
                    </div>
                </div>
   
                    <h2 class="section-title" >Liquides <span style={{color:'#f1d243'}}>Bouteille</span></h2>
                    
                
                <div class="car-ds">
                    <div class="card card-2" onClick={() => setShowLiquideBFModal(true)}>
                        <div class="card--data">
                            <div class="card--content">
                                <h5 class="card--title">Fruité</h5>
                                <h1>152</h1>
                            </div>
                            <img src={fruiteBIcon} className="-icons" alt="Vape Icon" />
                        </div>
                        <div class="card--stats">
                            <span><i class="ri-bar-chart-fill card--icon stat--icon"></i>65%</span>
                            <span><i class="ri-arrow-up-s-fill card--icon up--arrow"></i>10</span>
                            <span><i class="ri-arrow-down-s-fill card--icon down--arrow"></i>2</span>
                        </div>
                    </div>
                    <VenteLiquideBFModal show={showLiquideBFModal} liquides={liquideFruite} onHide={() => setShowLiquideBFModal(false)} OnVente={fetchLiquide}/>

                    <div class="card card-2" onClick={() => setShowLiquideBGModal(true)}>
                        <div class="card--data">
                            <div class="card--content">
                                <h5 class="card--title">Gourmand</h5>
                                <h1>1145</h1>
                            </div>
                            <img src={gourmandBIcon} className="-icons" alt="Liquide Icon" />
                        </div>
                        <div class="card--stats">
                            <span><i class="ri-bar-chart-fill card--icon stat--icon"></i>82%</span>
                            <span><i class="ri-arrow-up-s-fill card--icon up--arrow"></i>230</span>
                            <span><i class="ri-arrow-down-s-fill card--icon down--arrow"></i>45</span>
                        </div>
                    </div>
                    <VenteLiquideBGModal show={showLiquideBGModal} liquides={liquideGourmand} onHide={() => setShowLiquideBGModal(false)} OnVente={fetchLiquide}/>

                </div>
                  <h2 class="section-title" >Liquides <span style={{color:'#e65100'}}>Dose</span></h2>
                    
                
                <div class="car-ds">
                    <div class="card card-2-2" onClick={() => setShowLiquideDFModal(true)}>
                        <div class="card--data">
                            <div class="card--content">
                                <h5 class="card--title">Fruité</h5>
                                <h1>152</h1>
                            </div>
                            <img src={fruiteIcon} className="-icons" alt="Vape Icon" />
                        </div>
                        <div class="card--stats">
                            <span><i class="ri-bar-chart-fill card--icon stat--icon"></i>65%</span>
                            <span><i class="ri-arrow-up-s-fill card--icon up--arrow"></i>10</span>
                            <span><i class="ri-arrow-down-s-fill card--icon down--arrow"></i>2</span>
                        </div>
                    </div>
                    <VenteLiquideDFModal show={showLiquideDFModal} liquides={fruiteDose} onHide={() => setShowLiquideDFModal(false)} OnVente={fetchLiquide}/>

                    <div class="card card-2-2" onClick={() => setShowLiquideDGModal(true)}>
                        <div class="card--data">
                            <div class="card--content">
                                <h5 class="card--title">Gourmand</h5>
                                <h1>1145</h1>
                            </div>
                            <img src={gourmandIcon} className="-icons" alt="Liquide Icon" />
                        </div>
                        <div class="card--stats">
                            <span><i class="ri-bar-chart-fill card--icon stat--icon"></i>82%</span>
                            <span><i class="ri-arrow-up-s-fill card--icon up--arrow"></i>230</span>
                            <span><i class="ri-arrow-down-s-fill card--icon down--arrow"></i>45</span>
                        </div>
                    </div>
                    <VenteLiquideDGModal show={showLiquideDGModal} liquides={gourmandDose} onHide={() => setShowLiquideDGModal(false)} OnVente={fetchLiquide}/>

                </div>
            </div>
            <ServiceModal show={showServiceModal}  onHide={() => setShowServiceModal(false)} OnVente={fetchServices}/>

     
    </>
  );
};

export default Home;
