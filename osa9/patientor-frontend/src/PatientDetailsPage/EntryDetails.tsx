import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { apiBaseUrl } from '../constants';
import { Diagnosis, Entry } from '../types';

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [ diagnosesInfo, setDiagnosesInfo ] = useState<Diagnosis[]>([]);

  useEffect(() => {
    // Retrieve Diagnosis data from backend:
    axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`)
      .then(result => result.data)
      .then(diagnoses => setDiagnosesInfo(diagnoses));
  }, [])

  const renderDiagnoses = () => entry.diagnosisCodes
    ? entry.diagnosisCodes.map(code =>
      <li key={code}>
        {code} {diagnosesInfo.find(diagnosis => diagnosis.code === code)?.name}
      </li>
    )
    : <p>No diagnoses</p>;

  return (
    <div>
      <div>{entry.date} {entry.description}</div>
      <ul>{renderDiagnoses()}</ul>
    </div>
  );
};

export default EntryDetails;