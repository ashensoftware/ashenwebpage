import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { FormspreeProvider } from '@formspree/react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import { AppShell } from './App';
import { COMPANY } from './config/company';
import { localeFromPathname } from './config/i18n';
import { createI18n } from './i18n';

export async function render(url: string) {
  const pathname = new URL(url, 'https://ashensoftware.com').pathname;
  const i18n = await createI18n(localeFromPathname(pathname));
  const helmetContext = {} as { helmet?: {
    htmlAttributes: { toString(): string };
    title: { toString(): string };
    meta: { toString(): string };
    link: { toString(): string };
    script: { toString(): string };
  } };
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <I18nextProvider i18n={i18n}>
        <FormspreeProvider project={COMPANY.formspreeProjectId}>
          <MemoryRouter initialEntries={[url]}>
            <AppShell />
          </MemoryRouter>
        </FormspreeProvider>
      </I18nextProvider>
    </HelmetProvider>,
  );

  return {
    html,
    helmet: helmetContext.helmet,
  };
}
