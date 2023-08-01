import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { HashRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
// eslint-disable-next-line
import bootstrap from 'bootstrap';
import './index.scss';
import { App } from 'containers';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary
      fallback={
        <div className="block__text-error-message">
          Something went wrong. Try to get help from support service
          support@mysite.com
        </div>
      }
    >
      <HashRouter>
        <App />
      </HashRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
