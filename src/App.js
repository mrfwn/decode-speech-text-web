import React from 'react';
import Routes from './routes/index';
import GlobalStyle from './styles/global';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyProvider from './context/MyProvider';

function App() {
  return (
    <MyProvider>
      <Routes />
      <GlobalStyle />
    </MyProvider>
  );
}

export default App;
