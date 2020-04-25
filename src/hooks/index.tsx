import React from 'react';
import { ToastProvider } from './toast';
import { AuthProvider } from './auth';

const Contexts: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </AuthProvider>
  );
}

export default Contexts;
