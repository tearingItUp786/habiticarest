import React from 'react';

const Label = (props: aLabelProp) => {
  const { htmlFor, ...otherProps } = props;

  return <label htmlFor={htmlFor} {...otherProps} />;
};

export default Label;
