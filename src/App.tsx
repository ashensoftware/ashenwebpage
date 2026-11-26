import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { ScrollToHash } from './components/layout/ScrollToHash';
import { Layout } from './components/layout';
import HomePage from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AboutPage } from './pages/AboutPage';
import { ServiceDetailsPage } from './pages/ServiceDetailsPage';
import AiAgentsPage from './pages/AiAgentsPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import CaseStudyDetailPage from './pages/CaseStudyDetailPage';
import LegalPage from './pages/LegalPage';
import {
  DataAiEngineeringPage,
  IntegrationsPage,
  SoftwareDevelopmentPage,
} from './pages/PillarPage';
import { LOCALES } from './config/i18n';
import { caseStudyRoutePattern, pathFor, serviceRoutePattern, type RouteId } from './config/routes';

const LOCALIZED_PAGES: { id: Exclude<RouteId, 'trengie'>; element: React.ReactElement }[] = [
  { id: 'home', element: <HomePage /> },
  { id: 'aiAgents', element: <AiAgentsPage /> },
  { id: 'software', element: <SoftwareDevelopmentPage /> },
  { id: 'dataAi', element: <DataAiEngineeringPage /> },
  { id: 'integrations', element: <IntegrationsPage /> },
  { id: 'caseStudies', element: <CaseStudiesPage /> },
  { id: 'about', element: <AboutPage /> },
  { id: 'privacy', element: <LegalPage kind="privacy" /> },
  { id: 'terms', element: <LegalPage kind="terms" /> },
];

function SiteObservability() {
  const { pathname } = useLocation();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <>
      <Analytics
        beforeSend={(event) => {
          try {
            const url = new URL(event.url);
            url.search = '';
            url.hash = '';
            return { ...event, url: url.href };
          } catch {
            return event;
          }
        }}
      />
      <SpeedInsights route={pathname} />
    </>
  );
}

export function AppShell() {
  return (
    <>
      <SiteObservability />
      <ScrollToHash />
      <Layout>
        <Routes>
          {LOCALIZED_PAGES.flatMap(({ id, element }) =>
            LOCALES.map((locale) => (
              <Route key={`${id}:${locale}`} path={pathFor(id, locale)} element={element} />
            )),
          )}
          {LOCALES.map((locale) => (
            <Route key={`case:${locale}`} path={caseStudyRoutePattern(locale)} element={<CaseStudyDetailPage />} />
          ))}
          {LOCALES.map((locale) => (
            <Route key={`service:${locale}`} path={serviceRoutePattern(locale)} element={<ServiceDetailsPage />} />
          ))}
          <Route path="/es/services/:id" element={<ServiceDetailsPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </>
  );
}

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
};

export default App;
