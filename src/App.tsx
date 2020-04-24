import React from 'react';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { AuthProvider} from './context/AuthContext';
import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <SignIn />
      </AuthProvider>
    </>
  );
};

export default App;
