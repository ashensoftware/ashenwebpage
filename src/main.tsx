import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { FormspreeProvider } from '@formspree/react';
import './styles/index.css';
import App from './App.tsx';
import './i18n.ts';
import { COMPANY } from './config/company';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <FormspreeProvider project={COMPANY.formspreeProjectId}>
        <App />
      </FormspreeProvider>
    </HelmetProvider>
  </StrictMode>,
);
