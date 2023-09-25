import React from 'react';

export const Button = ({ cls, label, handleOnChange }) => {
  return (
    <div className={cls} onClick={() => handleOnChange(label)}>
      {label}
    </div>
  );
};
