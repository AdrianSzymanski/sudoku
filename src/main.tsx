import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components';
import './variables.css';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
