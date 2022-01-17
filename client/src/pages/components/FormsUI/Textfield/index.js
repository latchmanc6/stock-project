import React from 'react';
import { TextField } from "@mui/material";
import { useField } from 'formik';

const TextfieldWrapper = ({
  name,
  ...otherProps
}) => {
  const [field, meta] = useField(name);

  // configure initial props for TextField
  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: 'outlined'
  };

  // display error messages
  if (meta && meta.touched && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }

  return (
    <TextField {...configTextfield} />
  );
};

export default TextfieldWrapper;