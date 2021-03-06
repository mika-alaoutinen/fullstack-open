import { State } from './state';
import { Diagnosis, Entry, Patient } from '../types';
import entryService from '../services/entryService';
import patientService from '../services/patientService';
import { PatientFormValues } from '../AddPatientModal/AddPatientForm';
import diagnosisService from '../services/diagnosisService';

export type Action =
  | { type: "SET_PATIENT_LIST", payload: Patient[] }
  | { type: "SET_DIAGNOSES_LIST", payload: Diagnosis[] }
  | { type: "ADD_PATIENT", payload: Patient }
  | { type: "ADD_ENTRY", payload: Patient }
  | { type: "ERROR" }

// Action creators:
export const addPatient = async (values: PatientFormValues): Promise<Action> => {
  const patient: Patient|void = await patientService.addPatient(values);

  return patient
    ? ({ type: 'ADD_PATIENT', payload: patient })
    : ({ type: 'ERROR' });
};

// Ei aavistustakaan, miten tämän saisi toimimaan.
export const addEntry = async (id: string, entry: Entry): Promise<Action> => {
  await entryService.addEntry(id, entry);
  const patient: Patient|void = await patientService.getPatient(id);

  return patient
    ? ({ type: 'ADD_ENTRY', payload: patient })
    : ({ type: 'ERROR' });
};

export const setPatientList = async (): Promise<Action> => {
  const patients: Patient[]|void = await patientService.getPatients();

  return ({
    type: 'SET_PATIENT_LIST',
    payload: patients ? patients : []
  });
};

export const setDiagnosesList = async (): Promise<Action> => {
  const diagnoses: Diagnosis[] = await diagnosisService.getDiagnoses();

  return ({
    type: 'SET_DIAGNOSES_LIST',
    payload: diagnoses,
  });
};

// The reducer:
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce((memo, patient) => ({ ...memo, [patient.id]: patient }), {}),
          ...state.patients
        }
      };
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce((memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }), {}),
          ...state.diagnoses
        }
      }
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ERROR":
    default:
      return state;
  }
};