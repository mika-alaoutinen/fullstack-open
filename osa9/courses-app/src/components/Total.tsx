import React from 'react';
import { CoursePart } from '../types';

const Total: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  const totalCount: number = courseParts.reduce((acc, part) => acc + part.exerciseCount, 0);

  return <p>Number of exercises: {totalCount}</p>;
}

export default Total;