import 'src/index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { router } from 'src/routes/router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster position='bottom-right' />
    <Tooltip id='tooltip' />
  </React.StrictMode>
);
