import { State } from './state';
import { Patient } from '../types';
import patientService from '../services/patientService';
import { PatientFormValues } from '../AddPatientModal/AddPatientForm';

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ERROR"
    };

// Action creators:
export const addPatient = async (values: PatientFormValues): Promise<Action> => {
  const patient: Patient|void = await patientService.addPatient(values);

  return patient
    ? ({ type: 'ADD_PATIENT', payload: patient })
    : ({ type: 'ERROR' })
};

export const setPatientList = async (): Promise<Action> => {
  const patients: Patient[]|void = await patientService.getPatients();

  return ({
    type: 'SET_PATIENT_LIST',
    payload: patients ? patients : []
  })
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
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ERROR":
      return state;
    default:
      return state;
  }
};