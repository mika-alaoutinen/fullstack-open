import React from 'react';

import HealthCheckEntryDetails from './HealthCheckEntryDetails';
import HospitalEntryDetails from './HospitalEntryDetails';
import OccupationalHealthcareEntryDetails from './OccupationalHealthcareEntryDetails';
import { Entry } from '../types';
import { assertNever } from '../utils';

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheckEntryDetails entry={entry} />
    case 'Hospital':
      return <HospitalEntryDetails entry={entry} />
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntryDetails entry={entry} />
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;