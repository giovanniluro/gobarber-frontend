import React from 'react';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Contexts from './hooks/index';
import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Contexts>
        <SignIn />
      </Contexts>
    </>
  );
};

export default App;
