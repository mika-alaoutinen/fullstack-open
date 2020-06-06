import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Icon } from "semantic-ui-react";

import EntriesList from './EntriesList';
import { Patient, Gender } from '../types';
import { apiBaseUrl } from '../constants';

const PatientDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [ patient, setPatient ] = useState<Patient>();

  useEffect(() => {
    if (!patient) {
      getPatientFromBackend()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setPatient]);
  
  const getPatientFromBackend = (): void => {
    axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)
      .then(result => result.data)
      .then(patient => setPatient(patient));
  }

  // Don't render component if patient is null
  if (!patient) {
    return null;
  }
  
  const renderGenderIcon = () => {
    if (patient.gender === Gender.Male) {
      return <Icon name="mars" />
    } else if (patient.gender === Gender.Female) {
      return <Icon name="venus" />
    } else {
      return <Icon name="genderless" />
    }
  }

  return (
    <div>
      <h2>{patient.name} {renderGenderIcon()}</h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <br />
      <EntriesList entries={patient.entries} />
    </div>
  );
}

export default PatientDetailsPage;