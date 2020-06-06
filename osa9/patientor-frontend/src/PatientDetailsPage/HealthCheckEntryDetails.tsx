import React, { useEffect, useState } from 'react';
import { Icon } from "semantic-ui-react";

import diagnosisService from '../services/diagnosisService';
import { Diagnosis, HealthCheckEntry } from '../types';

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  const [ diagnoses, setDiagnoses ] = useState<Diagnosis[]>([]);

  return (
    <div>
      
    </div>
  );
}

export default HealthCheckEntryDetails;