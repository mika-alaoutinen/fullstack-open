import { v4 as uuid } from 'uuid';
import patientData from '../../data/patientData';
import { NewPatient, Patient, PatientWithoutSSN } from '../types'

const getPatients = (): PatientWithoutSSN[] =>
  patientData;

const getPatient = (id: string): PatientWithoutSSN | undefined =>
  patientData.find(patient => patient.id === id);
  
const addPatient = (newPatient: NewPatient): Patient => {
  const patient = {
    id: uuid(),
    ...newPatient
  }

  patientData.push(patient);
  return patient;
}

export default { addPatient, getPatient, getPatients }