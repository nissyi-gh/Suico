import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { LoginFlagProvider } from './providers/LoginFlagProvider';
import { SleepLogsProvider } from './providers/SleepLogsProvider';
import './css/output.css'
import { AlarmPresetsProvider } from './providers/AlarmPresetsProvider';
import { ShowAlarmFlagProvider } from './providers/ShowAlarmFlagProvider';

ReactDOM.render(
  <React.StrictMode>
    <LoginFlagProvider>
      <SleepLogsProvider>
        <AlarmPresetsProvider>
          <ShowAlarmFlagProvider>
            <App />
          </ShowAlarmFlagProvider>
        </AlarmPresetsProvider>
      </SleepLogsProvider>
    </LoginFlagProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
