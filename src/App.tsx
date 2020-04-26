import React from 'react';
import Contexts from './hooks/index';
import GlobalStyle from './styles/global';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Contexts>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Contexts>
    </>
  );
};

export default App;
