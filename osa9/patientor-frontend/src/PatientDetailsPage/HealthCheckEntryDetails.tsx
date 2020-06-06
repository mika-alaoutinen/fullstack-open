import React, { useEffect, useState } from 'react';
import { Icon } from "semantic-ui-react";

import diagnosisService from '../services/diagnosisService';
import { HealthCheckEntry, HealthCheckRating } from '../types';

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  const [ diagnosesTexts, setDiagnosesTexts ] = useState<string[]>([]);

  useEffect(() => {
    diagnosisService.findDiagnosisTexts(entry.diagnosisCodes)
      .then(texts => setDiagnosesTexts(texts))
  }, []);

  const renderHealthCheckRating = () => {
    switch (entry.healthCheckRating) {
      case HealthCheckRating.Healthy:
        return <Icon name='heart' color='green' />
      case HealthCheckRating.LowRisk:
        return <Icon name='heart' color='yellow' />
      case HealthCheckRating.HighRisk:
        return <Icon name='heart' color='orange' />
      case HealthCheckRating.CriticalRisk:
        return <Icon name='heart' color='red' />
      default:
        break;
    }
  }
  
  return (
    <div>
      <div>
        <b>{entry.date}</b>
        <Icon name='doctor'/>
      </div>

      <div>{entry.description}</div>

      <br />
      { diagnosesTexts.length > 0 &&
        <div>
          <p><b>Diagnoses:</b></p>
          <ul>
            {diagnosesTexts.map(text =>
              <li key={text.substr(0, 6)}>{text}</li>
            )}
          </ul>
        </div>
      }

      {renderHealthCheckRating()}
    </div>
  );
}

export default HealthCheckEntryDetails;