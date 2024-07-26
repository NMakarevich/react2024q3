import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ErrorBoundary } from './components/error-boundary/error-boundary.tsx';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import NotFound from './components/not-found/not-found.tsx';
import DetailedCard from './components/detailed-card/detailed-card.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={'/search'} />,
  },
  {
    path: '/search',
    element: <App />,
    children: [
      {
        path: 'details',
        element: <DetailedCard />,
      },
    ],
  },
  { path: '/404', element: <NotFound /> },
  { path: '*', element: <Navigate to={'/404'} /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
);
