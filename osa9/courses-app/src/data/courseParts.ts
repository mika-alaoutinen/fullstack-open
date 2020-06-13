import { CoursePart } from '../types';

const data = [
  {
    "name": "Fundamentals",
    "exerciseCount": 10,
    "description": "This is an awesome course part"
  },
  {
    "name": "Using props to pass data",
    "exerciseCount": 7,
    "groupProjectCount": 3
  },
  {
    "name": "Deeper type usage",
    "exerciseCount": 14,
    "exerciseSubmissionLink": "https://fake-exercise-submit.made-up-url.dev"
  },
  {
    "name": "Why are there so many interfaces?",
    "exerciseCount": 11,
    "feeling": 1
  }
]

const courseParts: CoursePart[] = data.map(obj => obj as CoursePart);
export default courseParts;