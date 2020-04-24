import React from 'react';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { AuthProvider} from './hooks/AuthContext';
import GlobalStyle from './styles/global';
import ToastContainer from './components/ToastContainer';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <SignIn />
      </AuthProvider>
      <ToastContainer/>
    </>
  );
};

export default App;
