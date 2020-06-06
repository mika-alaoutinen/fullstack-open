import React from 'react';
import { Icon, Segment } from 'semantic-ui-react';

import Diagnoses from './Diagnoses';
import { HealthCheckEntry, HealthCheckRating } from '../types';

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {

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
    <Segment>
      <div>
        <b>{entry.date}</b>
        <Icon name='doctor'/>
      </div>

      <div>{entry.description}</div>
      <br />

      <Diagnoses codes={entry.diagnosisCodes} />

      {renderHealthCheckRating()}
    </Segment>
  );
}

export default HealthCheckEntryDetails;