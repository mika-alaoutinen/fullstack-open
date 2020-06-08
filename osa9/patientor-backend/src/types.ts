// enums
export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other',
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3
}

// interfaces
export interface Diagnosis {
  code: string,
  name: string,
  latin?: string,
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: Discharge;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: SickLeave;
}

interface Discharge {
  date: string;
  criteria: string;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries: Entry[],
}

// types
export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry;
export type NewEntry = DistributiveOmit<Entry, 'id'>

export type NewPatient = Omit<Patient, 'id'>;
export type PatientWithoutSSN = Omit<Patient, 'ssn'>;
export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

// A stupid hack to get around TypeScript's type system limitations
type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;