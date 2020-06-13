import React from 'react';

import { Entry } from '../types';

interface Props {
  onSubmit: (values: Entry) => void;
  onCancel: () => void;
}

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {

  return (
    <div>
      <p>Entry form</p>
    </div>
  );
}

export default AddEntryForm;