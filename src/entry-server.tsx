import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { FormspreeProvider } from '@formspree/react';
import { MemoryRouter } from 'react-router-dom';
import { AppShell } from './App';
import { COMPANY } from './config/company';
import './i18n';

export function render(url: string) {
  const helmetContext = {} as { helmet?: {
    htmlAttributes: { toString(): string };
    title: { toString(): string };
    meta: { toString(): string };
    link: { toString(): string };
    script: { toString(): string };
  } };
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <FormspreeProvider project={COMPANY.formspreeProjectId}>
        <MemoryRouter initialEntries={[url]}>
          <AppShell />
        </MemoryRouter>
      </FormspreeProvider>
    </HelmetProvider>,
  );

  return {
    html,
    helmet: helmetContext.helmet,
  };
}
