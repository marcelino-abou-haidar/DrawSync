import 'src/index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Tooltip } from 'react-tooltip';
import App from 'src/App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Toaster position='bottom-right' />
    <Tooltip id='tooltip' />
  </React.StrictMode>
);
