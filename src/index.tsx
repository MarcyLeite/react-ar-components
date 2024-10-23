import React from 'react';
import ReactDOM from 'react-dom/client';

import './assets/reset.scss';
import './assets/palette.scss';
import './assets/composition.scss'
import './assets/index.scss';

import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);