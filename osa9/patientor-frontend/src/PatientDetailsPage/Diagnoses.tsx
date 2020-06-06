import React, { useEffect, useState } from 'react';
import diagnosisService from '../services/diagnosisService';

const Diagnoses: React.FC<{ codes: string[] | undefined}> = ({ codes }) => {
  const [ diagnosesTexts, setDiagnosesTexts ] = useState<string[]>([]);

  useEffect(() => {
    diagnosisService.findDiagnosisTexts(codes)
      .then(texts => setDiagnosesTexts(texts))
  }, [codes]);

  if (!codes || diagnosesTexts.length === 0) {
    return null;
  }

  const renderDiagnoses = () => diagnosesTexts.map(text =>
    <li key={text.substr(0, 6)}>{text}</li>
  );
  
  return (
    <div>
      <h4>Diagnoses:</h4>
      <ul>{renderDiagnoses()}</ul>
    </div>
  );
};

export default Diagnoses;