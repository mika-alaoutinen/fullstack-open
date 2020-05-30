import { calculator } from './calculator';
import express from 'express';

const app = express();
const PORT = 3003;

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/calculate', (req, res) => {
  
  const { value1, value2, operation } = req.query;
  const result = calculator(value1, value2, operation);
  res.send(result);
})