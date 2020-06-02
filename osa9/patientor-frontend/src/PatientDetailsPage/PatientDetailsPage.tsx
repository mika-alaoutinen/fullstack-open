import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import { Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';

const PatientDetailsPage: React.FC = () => {
  const [{ patients }, dispatch ] = useStateValue();
  const { id } = useParams<{ id: string }>();
  console.log('id', id);
  

  return (
    <div>
      <h3>Nimi</h3>
    </div>
  );
}

export default PatientDetailsPage;