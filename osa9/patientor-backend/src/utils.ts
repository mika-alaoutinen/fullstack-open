/* eslint-disable @typescript-eslint/no-explicit-any */
import { Entry, Gender, NewPatient } from './types';

export const toNewPatient = (object: any): NewPatient =>
  ({
    name: parseName(object.name),
    dateOfBirth: parseDOB(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: parseEntries(object.entries)
  });

  const parseName = (name: any): string => {
    if (!name || !isString(name)) {
      throw new Error(`Incorrect or missing name ${name}`);
    }
    return name;
  };

  const parseDOB = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
      throw new Error(`Incorrect or missing date ${date}`);
    }
    return date;
  };

  const parseSSN = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
      throw new Error(`Incorrect or missing ssn ${ssn}`);
    }
    return ssn;
  };

  const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
      throw new Error(`Incorrect or missing gender ${gender}`);
    }
    return gender;
  };

  const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
      throw new Error(`Incorrect or missing occupation ${occupation}`);
    }
    return occupation;
  };

  const parseEntries = (entries: any): Entry[] => {
    return entries ? entries : [];
  };

// Type guards:
const isDate = (date: string): boolean => 
  Boolean(Date.parse(date));

const isGender = (param: any): param is Gender =>
  Object.values(Gender).includes(param);

const isString = (text: any): text is string =>
  typeof text === 'string' || text instanceof String;
