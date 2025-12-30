import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { createNoopAuthAdapter } from 'auth';
import App from './app/app';
import { AuthAdapterProvider } from './auth/auth-adapter';

const authAdapter = createNoopAuthAdapter();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <AuthAdapterProvider adapter={authAdapter}>
      <App />
    </AuthAdapterProvider>
  </StrictMode>,
);
