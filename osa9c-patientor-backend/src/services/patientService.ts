import patientData from '../../data/patientData';
import { PatientWithoutSSN } from '../types'

const getPatients = (): Array<PatientWithoutSSN> =>
  patientData.map(({ id, name, dateOfBirth, gender, occupation }) =>
    ({ id, name, dateOfBirth, gender, occupation })
  );

export default { getPatients }