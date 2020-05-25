import { calculateBmi } from './bmiCalculator';
import express from 'express';
const app = express();

const port = 3003;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

// Interfaces
interface BMI {
    height: number,
    weight: number,
    bmi: string,
}

interface ErrorMessage {
    error: string,
}

// Endpoints:
app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
    const height = _req.query.height;
    const weight = _req.query.weight;
    const bmiResponse = createBmiResponse(height, weight);
    res.send(bmiResponse);
});

// Utility functions:
const createBmiResponse = (height:number, weight:number): BMI | ErrorMessage => {
    return isNaN(height) || isNaN(weight)
        ? { error: 'malformatted parameters' }
        : {
            height,
            weight,
            bmi: calculateBmi(height, weight)
        }
}