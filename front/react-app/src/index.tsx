import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { LoginFlagProvider } from './providers/LoginFlagProvider';
import './css/output.css'

ReactDOM.render(
  <React.StrictMode>
    <LoginFlagProvider>
      <App />
    </LoginFlagProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
