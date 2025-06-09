import React from 'react';

const RevenuTables = ({ data }) => {
 

  return (
    <div className="container mt-4">
      <h2>Revenus Vapes</h2>
      <table className="table table-bordered text-center">
        <thead>
          <tr><th>Date</th><th>Nom</th><th>Quantité</th><th>Prix Unitaire</th><th>Vendu Par</th><th>Total</th></tr>
        </thead>
        <tbody>
          {data.vapes.map((v, i) => (
            <tr key={i}>
              <td>{new Date(v.date).toLocaleDateString()}</td>
              <td>{v.nom}</td>
              <td>{v.quantite}</td>
              <td>{v.prix_vente} TND</td>
              <td>{v.vendu_par}</td>
              <td>{v.total.toFixed(3)} TND</td>
            </tr>
          ))}
          <tr className="table-secondary fw-bold">
            <td colSpan="5">Total Revenus Vapes</td>
            <td>{data.totalVape.toFixed(3)} TND</td>
          </tr>
        </tbody>
      </table>

      <h2>Revenus Liquides</h2>
      <table className="table table-bordered text-center">
        <thead>
          <tr><th>Date</th><th>Nom</th><th>Catégorie</th><th>Type</th><th>Quantité</th><th>Prix Unitaire</th><th>Vendu Par</th><th>Total</th></tr>
        </thead>
        <tbody>
          {data.liquides.map((l, i) => (
            <tr key={i}>
              <td>{new Date(l.date).toLocaleDateString()}</td>
              <td>{l.nom}</td>
              <td>{l.categorie}</td>
              <td>{l.type}</td>
              <td>{l.quantite}</td>
              <td>{l.prix_vente} TND</td>
              <td>{l.vendu_par}</td>
              <td>{l.total.toFixed(3)} TND</td>
            </tr>
          ))}
          <tr className="table-secondary fw-bold">
            <td colSpan="7">Total Revenus Liquides</td>
            <td>{data.totalLiquide.toFixed(3)} TND</td>
          </tr>
        </tbody>
      </table>

      <h2>Revenus Accessoires</h2>
      <table className="table table-bordered text-center">
        <thead>
          <tr><th>Date</th><th>Nom</th><th>Quantité</th><th>Prix Unitaire</th><th>Vendu Par</th><th>Total</th></tr>
        </thead>
        <tbody>
          {data.accessoires.map((a, i) => (
            <tr key={i}>
              <td>{new Date(a.date).toLocaleDateString()}</td>
              <td>{a.nom}</td>
              <td>{a.quantite}</td>
              <td>{a.prix_vente} TND</td>
              <td>{a.vendu_par}</td>
              <td>{a.total.toFixed(3)} TND</td>
            </tr>
          ))}
          <tr className="table-secondary fw-bold">
            <td colSpan="5">Total Revenus Accessoires</td>
            <td>{data.totalAccessoire.toFixed(3)} TND</td>
          </tr>
        </tbody>
      </table>

      <h3 className="text-end mt-4">
        Total Général Revenus : <strong>{data.totalRevenu.toFixed(3)} TND</strong>
      </h3>
    </div>
  );
};

export default RevenuTables;
