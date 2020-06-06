import React, { useEffect, useState } from 'react';
import { Icon } from "semantic-ui-react";

import diagnosisService from '../services/diagnosisService';
import { HospitalEntry } from '../types';

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  const [ diagnosesTexts, setDiagnosesTexts ] = useState<string[]>([]);
  
  useEffect(() => {
    diagnosisService.findDiagnosisTexts(entry.diagnosisCodes)
      .then(texts => setDiagnosesTexts(texts))
  }, []);

  const renderDiagnosesTexts = () => diagnosesTexts.map(text =>
    <li key={text.substr(0, 6)}>{text}</li>
  );
  
  return (
    <div>
      <div>
        <b>{entry.date}</b>
        <Icon name='hospital'/>
      </div>

      <div>{entry.description}</div>

      <br />
      { diagnosesTexts.length > 0
        ? <div>
            <p><b>Diagnoses:</b></p>
            <ul>{renderDiagnosesTexts()}</ul>
          </div>
        : <></>
      }

      { diagnosesTexts.length > 0 &&
        <div>
          <p><b>Diagnoses:</b></p>
          <ul>{renderDiagnosesTexts()}</ul>
        </div>
      }
      
      <div>
        <b>discharge:</b> {entry.discharge.date} - {entry.discharge.criteria}
      </div>
    </div>
  );
};

export default HospitalEntryDetails;