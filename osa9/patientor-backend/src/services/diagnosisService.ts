import diagnosisData from '../../data/diagnosisData';
import { Diagnosis } from '../types';

const getDiagnoses = (): Array<Diagnosis> =>
  diagnosisData;

export default { getDiagnoses }