import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { FormspreeProvider } from '@formspree/react';
import { I18nextProvider } from 'react-i18next';
import './styles/index.css';
import App from './App.tsx';
import i18n from './i18n.ts';
import { COMPANY } from './config/company';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Missing #root');
}

const app = (
  <StrictMode>
    <HelmetProvider>
      <I18nextProvider i18n={i18n}>
        <FormspreeProvider project={COMPANY.formspreeProjectId}>
          <App />
        </FormspreeProvider>
      </I18nextProvider>
    </HelmetProvider>
  </StrictMode>
);

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
