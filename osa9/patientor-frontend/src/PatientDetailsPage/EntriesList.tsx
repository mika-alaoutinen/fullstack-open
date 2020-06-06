import React from 'react';
import EntryDetails from './EntryDetails';
import { Entry } from '../types';

const EntriesList: React.FC<{ entries: Entry[]}> = ({ entries }) => {

  const renderEntries = () => entries.length > 0
    ? entries.map(entry => <EntryDetails key={entry.id} entry={entry} />)
    : <p>No entries</p>
  
  return (
    <div>
      <h3>entries</h3>
      {renderEntries()}
    </div>
  );
};

export default EntriesList;