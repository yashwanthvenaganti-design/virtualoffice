import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import './index.css';
import App from './App';
import ErrorBoundary from './utils/ErrorBoundary';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <StrictMode>
    <ErrorBoundary fallback={<div>Something went wrong.</div>}>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
