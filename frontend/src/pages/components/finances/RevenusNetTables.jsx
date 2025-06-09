import React from 'react';

const RevenusNetTables = ({ totalDepense, totalRevenu , totalStock }) => {
  const revenuNet = totalRevenu - totalDepense;
  const valeurTotale = revenuNet + totalStock;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Résumé Financier Net</h2>
      <table className="table table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>Description</th>
            <th>Montant (TND)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total des Revenus</td>
            <td>{totalRevenu.toFixed(3)} TND</td>
          </tr>
          <tr>
            <td>Total des Dépenses</td>
            <td>{totalDepense.toFixed(3)} TND</td>
          </tr>
          <tr className="table-warning fw-bold">
            <td>Revenu Net (Revenus - Dépenses)</td>
            <td>{revenuNet.toFixed(3)} TND</td>
          </tr>
          <tr>
            <td>Valeur du Stock Restant</td>
            <td>{totalStock.toFixed(3)} TND</td>
          </tr>
          <tr className="table-success fw-bold">
            <td>Valeur Totale Finale</td>
            <td>{valeurTotale.toFixed(3)} TND</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RevenusNetTables;
