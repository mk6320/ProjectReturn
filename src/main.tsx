import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Error Trap
window.onerror = function (message, source, lineno, _colno, error) {
  document.body.innerHTML = `<div style="color:red; padding:20px; background:black;">
    <h1>Error Detected</h1>
    <p>${message}</p>
    <p>${source}:${lineno}</p>
    <pre>${error?.stack}</pre>
  </div>`;
};

try {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
} catch (e) {
  console.error(e);
  document.body.innerHTML = `<h1 style="color:red">${e}</h1>`;
}
