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
          <Route path="/" element={<HomePage />} />
          <Route path="/es" element={<HomePage />} />

          <Route path="/ai-agents" element={<AiAgentsPage />} />
          <Route path="/es/agentes-ia" element={<AiAgentsPage />} />

          <Route path="/software-development" element={<SoftwareDevelopmentPage />} />
          <Route path="/es/desarrollo-software" element={<SoftwareDevelopmentPage />} />

          <Route path="/data-ai-engineering" element={<DataAiEngineeringPage />} />
          <Route path="/es/datos-ia" element={<DataAiEngineeringPage />} />

          <Route path="/integrations" element={<IntegrationsPage />} />
          <Route path="/es/integraciones" element={<IntegrationsPage />} />

          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/es/casos" element={<CaseStudiesPage />} />
          <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />
          <Route path="/es/casos/:slug" element={<CaseStudyDetailPage />} />

          <Route path="/about" element={<AboutPage />} />
          <Route path="/es/nosotros" element={<AboutPage />} />

          <Route path="/privacy" element={<LegalPage kind="privacy" />} />
          <Route path="/es/privacidad" element={<LegalPage kind="privacy" />} />
          <Route path="/terms" element={<LegalPage kind="terms" />} />
          <Route path="/es/terminos" element={<LegalPage kind="terms" />} />

          <Route path="/services/:id" element={<ServiceDetailsPage />} />
          <Route path="/es/servicios/:id" element={<ServiceDetailsPage />} />
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
