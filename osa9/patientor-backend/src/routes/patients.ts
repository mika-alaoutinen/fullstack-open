import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient } from '../utils';

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

router.post('/', (_req, res) => {
  try {
    const patient = toNewPatient(_req.body);
    const savedPatient = patientService.addPatient(patient);
    res.json(savedPatient);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;