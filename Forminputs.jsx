import React from 'react';
import './forminputs.css';

const Forminputs = (props) => {
  const { onChange, id, label, ...inputProps } = props;

  return (
    <div className='forminputs'>
      <input {...inputProps} id={id} onChange={onChange} />
    </div>
  );
};

export default Forminputs;
