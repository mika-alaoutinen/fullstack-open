import React, { useEffect, useState } from 'react';
import { Icon } from "semantic-ui-react";

import diagnosisService from '../services/diagnosisService';
import { OccupationalHealthcareEntry } from '../types';

const OccupationalHealthcareEntryDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  const [ diagnosesTexts, setDiagnosesTexts ] = useState<string[]>([]);

  useEffect(() => {
    diagnosisService.findDiagnosisTexts(entry.diagnosisCodes)
      .then(texts => setDiagnosesTexts(texts))
  }, []);

  return (
    <div>
      <div>
        <b>{entry.date}</b>
        <Icon name='stethoscope'/>
        <b>{entry.employerName}</b>
      </div>

      <div>{entry.description}</div>

      <br />
      { diagnosesTexts.length > 0 &&
        <div>
          <h4>Diagnoses:</h4>
          <ul>
            {diagnosesTexts.map(text =>
              <li key={text.substr(0, 6)}>{text}</li>
            )}
          </ul>
        </div>
      }

      {entry.sickLeave &&
        <>
          <h4>Sick leave</h4>
          <p>from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</p>
        </>
      }
    </div>
  );
};

export default OccupationalHealthcareEntryDetails;