import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';

import AddEntryModal from '../AddEntryModal/AddEntryModal';
import EntriesList from './EntriesList';
import entryService from '../services/entryService';
import patientService from '../services/patientService';
import { Patient, Gender, Entry } from '../types';

const PatientDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [ patient, setPatient ] = useState<Patient|void>();
  const [ modalOpen, setModalOpen ] = useState<boolean>(false);
  const [ error, setError ] = useState<string | undefined>();

  useEffect(() => {
    patientService.getPatient(id)
      .then(patient => setPatient(patient));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setPatient]);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (entry: Entry): Promise<void> => {
    await entryService.addEntry(id, entry);
    setPatient(await patientService.getPatient(id));
    closeModal();
  };
  
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

      <br />
      <AddEntryModal
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={submitNewEntry}
        error={error}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
}

export default PatientDetailsPage;