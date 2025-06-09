import React, { useState, useEffect } from 'react';

const SelectMoisAnnee = ({ value, onChange }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const today = new Date();
    const moisOptions = [];

    // Générer les 12 derniers mois au format YYYY-MM
    for (let i = 0; i < 12; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      moisOptions.push(`${year}-${month}`);
    }
    setOptions(moisOptions);
  }, []);

  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="form-select">
      <option value="">-- Choisir un mois --</option>
      {options.map((mois) => (
        <option key={mois} value={mois}>
          {mois}
        </option>
      ))}
    </select>
  );
};

export default SelectMoisAnnee;
