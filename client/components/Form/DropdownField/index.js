import React from 'react';
import { Field } from 'redux-form';
import List from 'react-widgets/lib/DropdownList'

const CustomList = ({ input, data, valueField, textField }) => {
  return (
    <List
      {...input}
      data={data}
      valueField={valueField}
      textField={textField}
      onChange={input.onChange} />
  );
};

const DropdownField = props => {
  return (
    <Field
      component={CustomList}
      {...props}
    />
  );
};
export default DropdownField;
