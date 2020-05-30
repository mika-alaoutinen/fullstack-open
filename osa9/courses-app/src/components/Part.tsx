import React from 'react';
import { assertNever } from '../utils';
import { CoursePart } from '../types';

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  const { name, exerciseCount } = part;
  let description: string | undefined;
  let groupProjectCount: number | undefined;
  let exerciseSubmissionLink: string | undefined;
  let feeling: number | undefined;
  
  switch (part.name) {
    case 'Fundamentals':
      description = part.description;
      break;
    case 'Using props to pass data':
      groupProjectCount = part.groupProjectCount;
      break;
    case 'Deeper type usage':
      exerciseSubmissionLink = part.exerciseSubmissionLink;
      break;
    case 'Why are there so many interfaces?':
      feeling = part.feeling;
      break;
    default:
      return assertNever(part);
  }

  return (
    <>
      <div><b>Nimi:</b> {name}</div>

      <div><b>Harjoitusten lukumäärä:</b> {exerciseCount}</div>

      { description &&
        <div><b>kuvaus:</b> {description}</div>
      }

      { groupProjectCount &&
        <div><b>Ryhmätöitä:</b> {groupProjectCount}</div>
      }

      { exerciseSubmissionLink &&
        <div><b>Harjoitusten palautus:</b> {exerciseSubmissionLink}</div>
      }

      { feeling &&
        <div><b>Fiilis TypeScriptista:</b> {feeling}</div>
      }

      <br />
    </>
  )
}

export default Part;