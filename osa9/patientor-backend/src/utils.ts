/* eslint-disable @typescript-eslint/no-explicit-any */
import { Entry, Gender, HealthCheckRating, NewEntry, NewPatient } from './types';

export const toNewEntry = (object: any): NewEntry => {
  const baseEntry = {
    date: parseDate(object.date),
    type: object.type,
    specialist: parseString(object.specialist, 'specialist'),
    diagnosisCodes: object.diagnosisCodes,
    description: parseString(object.description, 'description'),
  }

  switch (object.type) {
    case 'HealthCheck':
      return {
        ...baseEntry,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };

    case 'Hospital':
      return {
        ...baseEntry,
        discharge: {
          date: parseDate(object.discharge.date),
          criteria: parseString(object.discharge.criteria, 'criteria'),
        }
      };
      
    case 'OccupationalHealthcare':
      return {
        ...baseEntry,
        employerName: parseString(object.employerName, 'employerName'),
        sickLeave: {
          startDate: parseDate(object.sickLeave.startDate),
          endDate: parseDate(object.sickLeave.endDate),
        }
      };

    default:
      throw new Error(`Unknown Entry type ${object.type} in object ${object}`)
  }
};

export const toNewPatient = (object: any): NewPatient => ({
    name: parseString(object.name, 'name'),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn, 'ssn'),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation, 'occupation'),
    entries: parseEntries(object.entries)
});

const parseString = (string: any, itemName: string): string => {
  if (!string || !isString(string)) {
    throw new Error(`Incorrect or missing ${itemName} ${string}`);
  }
  return string;
}

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date ${date}`);
  }
  return date;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender ${gender}`);
  }
  return gender;
};

const parseHealthCheckRating = (healthRating: any): HealthCheckRating => {
  if (!healthRating || isHealthCheckRating(healthRating)) {
    throw new Error(`Incorrect or missing health check rating ${healthRating}`);
  }
  return healthRating;
}

const parseEntries = (entries: any): Entry[] => {
  return entries ? entries : [];
};

// Type guards:
const isDate = (date: string): boolean => 
  Boolean(Date.parse(date));

const isGender = (param: any): param is Gender =>
  Object.values(Gender).includes(param);

const isHealthCheckRating = (param: any): param is HealthCheckRating =>
  Object.values(HealthCheckRating).includes(param);
  
const isString = (text: any): text is string =>
  typeof text === 'string' || text instanceof String;
