import cors from 'cors';
import express from 'express';

import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';
import pingRouter from './routes/ping';

const app = express();
app.use(express.json());
app.use(cors());

// Routers:
app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);
app.use('/api/ping', pingRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});