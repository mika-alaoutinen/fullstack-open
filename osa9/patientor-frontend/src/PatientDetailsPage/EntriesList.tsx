import React from 'react';
import EntryDetails from './EntryDetails';
import { Entry } from '../types';

const EntriesList: React.FC<{ entries: Entry[]}> = ({ entries }) => {

  const renderEntries = () => entries.map(entry =>
    <EntryDetails key={entry.id} entry={entry} />
  );
  
  return (
    <div>
      <h3>entries</h3>
      {renderEntries()}
    </div>
  );
};

export default EntriesList;