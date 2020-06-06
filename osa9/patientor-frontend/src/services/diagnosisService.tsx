import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Diagnosis } from '../types';

let diagnoses: Diagnosis[] = [];

/**
 * Retrieves diagnosis data from backend
 * @returns {Array<Diagnosis>} diagnosis data.
 */
const getDiagnosisData = async () =>
  diagnoses.length === 0
    ? axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`)
      .then(result => result.data)
    : diagnoses;

/**
 * Find the textual description of a Diagnosis code.
 * @param code Diagnosis code
 * @returns {string} the textual representation for the diagnosis.
 */
const findDiagnosisTexts = async (codes: string[] | undefined): Promise<string[]> => {
  if (!codes) {
    return [];
  }

  const data: Diagnosis[] = await getDiagnosisData();
  return data
    .filter(diagnosis => codes.includes(diagnosis.code))
    .map(diagnosis => `${diagnosis.code} ${diagnosis.name}`)
}

export default { findDiagnosisTexts };