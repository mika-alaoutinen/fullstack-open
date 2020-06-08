import express from 'express';
import patientService from '../services/patientService';
import { toNewEntry, toNewPatient } from '../utils';
import { NewEntry, NewPatient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (_req, res) => {
  const patient = patientService.getPatient(_req.params.id);
  patient
    ? res.send(patient)
    : res.sendStatus(404);
});

router.post('/:id/entries', (_req, res) => {
  const entry: NewEntry = toNewEntry(_req.body);
  const savedEntry = patientService.addEntry(_req.params.id, entry);
  res.json(savedEntry);
});

router.post('/', (_req, res) => {
  try {
    const patient: NewPatient = toNewPatient(_req.body);
    const savedPatient = patientService.addPatient(patient);
    res.json(savedPatient);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;