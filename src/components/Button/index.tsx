import React, { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Input: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <button {...rest}>{children}</button>
  );
};

export default Input;
