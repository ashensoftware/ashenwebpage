import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ScrollToHash } from './components/layout/ScrollToHash';
import { Layout } from './components/layout';
import HomePage from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';

const AboutPage = lazy(() => import('./pages/AboutPage').then((module) => ({ default: module.AboutPage })));
const ServiceDetailsPage = lazy(() =>
  import('./pages/ServiceDetailsPage').then((module) => ({ default: module.ServiceDetailsPage })),
);
const AiAgentsPage = lazy(() => import('./pages/AiAgentsPage'));
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage'));
const CaseStudyDetailPage = lazy(() => import('./pages/CaseStudyDetailPage'));
const LegalPage = lazy(() => import('./pages/LegalPage'));
const SoftwareDevelopmentPage = lazy(() =>
  import('./pages/PillarPage').then((module) => ({ default: module.SoftwareDevelopmentPage })),
);
const DataAiEngineeringPage = lazy(() =>
  import('./pages/PillarPage').then((module) => ({ default: module.DataAiEngineeringPage })),
);
const IntegrationsPage = lazy(() =>
  import('./pages/PillarPage').then((module) => ({ default: module.IntegrationsPage })),
);

const PageFallback = () => (
  <div className="min-h-[40vh] flex items-center justify-center text-text-secondary">…</div>
);

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToHash />
      <Layout>
        <Suspense fallback={<PageFallback />}>
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
        </Suspense>
      </Layout>
    </Router>
  );
};

export default App;
