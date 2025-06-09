import React from 'react';

const Overview = ({ produits }) => {
  if (!produits || Object.keys(produits).length === 0) {
    return <p className="text-center mt-5">Chargement des données...</p>;
  }

  const labels = {
    vapes: 'Vapes',
    liquides: 'Liquides',
    accessoires: 'Accessoires'
  };

  return (
    <div className="overview">
      <div className="title">
        <h2 className="section--title">Aperçu du Stock</h2>
      </div>

      <div className="cards">
        {Object.entries(produits).map(([key, val], index) => (
          <div className={`card card-${index + 1}`} key={key}>
            <div className="card--data">
              <div className="card--content">
                <h5 className="card--title">Liste {labels[key] || key}</h5>
                <h1>{val.totalProduits}</h1>
              </div>
              <i className="ri-archive-2-line card--icon--lg"></i>
            </div>
            <div className="card--stats">
              <span>
                <i className="ri-bar-chart-fill card--icon stat--icon"></i>
                Total : {val.quantiteVendue + val.quantiteStock}
              </span>
              <span>
                <i className="ri-arrow-up-s-fill card--icon up--arrow"></i>
                Vendus : {val.quantiteVendue}
              </span>
              <span>
                <i className="ri-arrow-down-s-fill card--icon down--arrow"></i>
                En Stock : {val.quantiteStock}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;
