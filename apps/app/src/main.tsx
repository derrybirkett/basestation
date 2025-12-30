import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { createLocalStorageAuthAdapter } from 'auth';
import App from './app/app';
import { AuthAdapterProvider } from './auth/auth-adapter';
import { AuthSessionProvider } from './auth/auth-session';

const authAdapter = createLocalStorageAuthAdapter();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <AuthAdapterProvider adapter={authAdapter}>
      <AuthSessionProvider>
        <App />
      </AuthSessionProvider>
    </AuthAdapterProvider>
  </StrictMode>,
);
