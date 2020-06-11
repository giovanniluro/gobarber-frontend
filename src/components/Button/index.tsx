import React, { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => {
  return (
    <button {...rest}>{
      loading ? 'Carregando...':children
    }</button>
  );
};

export default Button;
