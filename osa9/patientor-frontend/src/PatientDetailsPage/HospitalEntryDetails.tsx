import React from 'react';
import { Icon, Segment } from 'semantic-ui-react';

import Diagnoses from './Diagnoses';
import { HospitalEntry } from '../types';

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {

  return (
    <Segment>
      <div>
        <b>{entry.date}</b>
        <Icon name='hospital'/>
      </div>

      <div>{entry.description}</div>

      <br />
      <Diagnoses codes={entry.diagnosisCodes} />

      <div>
        <b>discharge:</b> {entry.discharge.date} - {entry.discharge.criteria}
      </div>
    </Segment>
  );
};

export default HospitalEntryDetails;