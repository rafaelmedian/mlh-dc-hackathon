import React from 'react';
import { Field  }from 'redux-form';
import Input from '../Input';

const InputField = props => {
  return (
    <Field
      component={Input}
      type="text"
      {...props}
    />
  );
};

export default InputField;
