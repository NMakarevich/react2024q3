import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from './pages/main-page/main-page.tsx';
import UncontrolledPage from './pages/uncontrolled-page/uncontrolled-page.tsx';
import ControlledPage from './pages/controlled-page/controlled-page.tsx';

const router = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      {
        path: '',
        element: <MainPage />,
      },
      {
        path: 'uncontrolled',
        element: <UncontrolledPage />,
      },
      {
        path: 'controlled',
        element: <ControlledPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
