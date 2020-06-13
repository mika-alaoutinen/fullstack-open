import React from 'react';
import Part from './Part';
import { CoursePart } from '../types';

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  const parts = courseParts.map(part =>
    <Part key={part.name} part={part} />
  );

  return <>{parts}</>
}

export default Content;