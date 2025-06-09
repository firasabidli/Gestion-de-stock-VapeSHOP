import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DepenseTables = ({ data }) => {
 
 

  return (
    <div className="container mt-4">
      <h2>Dépenses Vape</h2>
      <table className="table table-bordered text-center">
        <thead>
          <tr><th>Date</th><th>Nom</th><th>Prix d'achat</th><th>Quantité</th><th>Total</th></tr>
        </thead>
        <tbody>
          {data.vape.map((v, i) => (
            <tr key={i}>
              <td>{new Date(v.date).toLocaleDateString()}</td>
              <td>{v.nom}</td>
              <td>{v.prix_achat} TND</td>
              <td>{v.quantite}</td>
              <td>{v.total.toFixed(3)} TND</td>
            </tr>
          ))}
          <tr className="table-secondary fw-bold">
            <td colSpan="4">Total Dépense Vape</td>
            <td>{data.totalVape.toFixed(3)} TND</td>
          </tr>
        </tbody>
      </table>

      <h2>Dépenses Produit Liquide</h2>
      <table className="table table-bordered text-center">
        <thead>
          <tr><th>Date</th><th>Prix Arome</th><th>Qté Arome</th><th>Prix Base</th><th>Qté Base</th><th>Total Arome</th><th>Total Base</th></tr>
        </thead>
        <tbody>
          {data.produitLiquide.map((l, i) => (
            <tr key={i}>
              <td>{new Date(l.date).toLocaleDateString()}</td>
              <td>{l.prix_arome} TND</td>
              <td>{l.qte_arome}</td>
              <td>{l.prix_base} TND</td>
              <td>{l.qte_base}</td>
              <td>{l.total_arome.toFixed(3)} TND</td>
              <td>{l.total_base.toFixed(3)} TND</td>
            </tr>
          ))}
          <tr className="table-secondary fw-bold">
            <td colSpan="6">Total Dépense Produit Liquide</td>
            <td>{data.totalLiquide.toFixed(3)} TND</td>
          </tr>
        </tbody>
      </table>

      <h2>Dépenses Accessoires</h2>
      <table className="table table-bordered text-center">
        <thead>
          <tr><th>Date</th><th>Nom</th><th>Prix d'achat</th><th>Quantité</th><th>Total</th></tr>
        </thead>
        <tbody>
          {data.accessoire.map((a, i) => (
            <tr key={i}>
              <td>{new Date(a.date).toLocaleDateString()}</td>
              <td>{a.nom}</td>
              <td>{a.prix_achat} TND</td>
              <td>{a.quantite}</td>
              <td>{a.total.toFixed(3)} TND</td>
            </tr>
          ))}
          <tr className="table-secondary fw-bold">
            <td colSpan="4">Total Dépense Accessoires</td>
            <td>{data.totalAccessoire.toFixed(3)} TND</td>
          </tr>
        </tbody>
      </table>

      <h2>Paiements des Employés</h2>
      <table className="table table-bordered text-center">
        <thead>
          <tr><th>Nom</th><th>Paiements</th><th>Total</th></tr>
        </thead>
        <tbody>
          {data.salaries.map((s, i) => (
            <tr key={i}>
              <td>{s.nom}</td>
              <td>
                <ul className="mb-0">
                  {s.paiements.map((p, j) => (
                    <li key={j}>{p.mois} : {p.montant} TND</li>
                  ))}
                </ul>
              </td>
              <td>{s.total.toFixed(3)} TND</td>
            </tr>
          ))}
          <tr className="table-secondary fw-bold">
            <td colSpan="2">Total Salaires</td>
            <td>{data.totalSalaries.toFixed(3)} TND</td>
          </tr>
        </tbody>
      </table>
      <h3 className="text-end mt-4">Total Général Dépenses : <strong>{data.totalDepense.toFixed(3)} TND</strong></h3>
    </div>
  );
};

export default DepenseTables;
