import { v4 as uuid } from 'uuid';
import patientData from '../../data/patientData';
import { Entry, NewEntry, NewPatient, Patient, PatientWithoutSSN, PublicPatient } from '../types';

const getPatients = (): PatientWithoutSSN[] =>
  patientData;

const getPatient = (id: string): PublicPatient | undefined =>
  patientData.find(patient => patient.id === id);

const addEntry = (id: string, newEntry: NewEntry): Entry | undefined => {
  const patient = patientData.find(patient => patient.id === id);
  if (!patient) {
    return undefined;
  }

  const entry: Entry = {
    id: uuid(),
    ...newEntry
  };
  
  patient.entries.push(entry);
  return entry;
}
  
const addPatient = (newPatient: NewPatient): Patient => {
  const patient = {
    id: uuid(),
    ...newPatient
  };

  patientData.push(patient);
  return patient;
};

export default { addPatient, getPatient, addEntry, getPatients };