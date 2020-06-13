import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Patient } from '../types';
import { PatientFormValues } from "../AddPatientModal/AddPatientForm";

const getPatients = async (): Promise<Patient[]|void> =>
  axios.get<Patient[]>(`${apiBaseUrl}/patients`)
    .then(result => result.data)
    .catch(error => console.log(error));

const getPatient = async (id: string): Promise<Patient|void> =>
  axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)
    .then(response => response.data)
    .catch(error => console.log(error));

const addPatient = async (patient: PatientFormValues): Promise<Patient|void> =>
  axios.post<Patient>(`${apiBaseUrl}/patients`, patient)
    .then(response => response.data)
    .catch(error => console.log(error));

export default { getPatients, getPatient, addPatient };