import React from 'react';

const Input = ({ input, meta, ...rest }) => {
  const { touched, error } = meta;
  return (
    <>
      <input
        {...input}
        {...rest}
      />
      {touched && error ? <span>{error}</span> : null}
    </>
  )
};

export default Input;
