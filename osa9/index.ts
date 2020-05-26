import { calculateBmi } from './bmiCalculator';
import { calculateExercises, Result } from './exerciseCalculator';
import express from 'express';

const app = express();
app.use(express.json())

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

// Error messages:
const malformattedParameters = { error: 'malformatted parameters' }
const parametersMissing = { error: 'parameters missing' }

// Endpoints:
app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = req.query.height;
    const weight = req.query.weight;
    const bmiResponse = createBmiResponse(height, weight);
    res.send(bmiResponse);
});

app.post('/exercises', (req, res) => {
    const target = req.body.target;
    const exercises = req.body.daily_exercises;
    res.send(createExerciseSummary(target, exercises));
});

// Utility functions:
const createBmiResponse = (height:number, weight:number): BMI | ErrorMessage => {
    return isNaN(height) || isNaN(weight)
        ? malformattedParameters
        : {
            height,
            weight,
            bmi: calculateBmi(height, weight)
        }
}

const createExerciseSummary = (target:number, exercises:Array<number>): Result | ErrorMessage => {
    if (!target || !exercises) {
        return parametersMissing;
    }
    
    if (isNaN(target) || exercises.some(exercise => isNaN(exercise))) {
        return malformattedParameters;
    }
    
    return calculateExercises(target, exercises);
}