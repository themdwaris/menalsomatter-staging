import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Start the mock service worker in development
async function startMockServiceWorker() {
  if (import.meta.env.DEV) {
    try {
      const { worker } = await import('./mocks/browser');
      await worker.start({
        onUnhandledRequest: 'bypass', // Don't warn about unhandled requests
        serviceWorker: {
          url: '/mockServiceWorker.js'
        }
      });
    } catch (error) {
      console.warn('MSW initialization failed:', error);
    }
  }
  return Promise.resolve();
}

// Initialize the app after potentially starting the MSW
startMockServiceWorker().then(() => {
  const root = document.getElementById('root');
  if (root) {
    createRoot(root).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  }
});