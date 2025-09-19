import React from 'react';
import ReactDOM from 'react-dom/client';
// Fix: Add .tsx extension for module resolution
import App from './App.tsx';
// Fix: Add .tsx extension for module resolution
import { LocalizationProvider } from './context/LocalizationContext.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <LocalizationProvider>
      <App />
    </LocalizationProvider>
  </React.StrictMode>
);