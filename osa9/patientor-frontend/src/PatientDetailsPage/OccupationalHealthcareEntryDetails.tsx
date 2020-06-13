import React from 'react';
import { Icon, Segment } from 'semantic-ui-react';

import Diagnoses from './Diagnoses';
import { OccupationalHealthcareEntry } from '../types';

const OccupationalHealthcareEntryDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {

  return (
    <Segment>
      <div>
        <b>{entry.date}</b>
        <Icon name='stethoscope'/>
        <b>{entry.employerName}</b>
      </div>

      <div>{entry.description}</div>

      <br />
      <Diagnoses codes={entry.diagnosisCodes} />

      {entry.sickLeave &&
        <>
          <h4>Sick leave</h4>
          <p>from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</p>
        </>
      }

    </Segment>
  );
};

export default OccupationalHealthcareEntryDetails;