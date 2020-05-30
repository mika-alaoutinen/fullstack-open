import React from 'react';
import { CoursePart } from '../types';

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {

  const parts = courseParts.map(part =>
    <p key={part.name}>{part.name} {part.exerciseCount}</p>
  );
  
  return <>{parts}</>
}

export default Content;