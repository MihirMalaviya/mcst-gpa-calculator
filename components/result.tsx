import React from 'react';

interface ResultProps {
  gpa: number;
  className?: string;
}

const Result: React.FC<ResultProps> = ({ gpa, className }) => {
  return (
    <div className={className}>
      <div>Your GPA: {gpa}</div>
    </div>
  );
};

export default Result;
