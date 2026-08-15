import React from 'react';
import { Link } from 'react-router-dom';
import { useLocale, useT } from '@/hooks/useLocale';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { SEO } from '@/components/SEO';
import { pathFor } from '@/config/routes';

export const NotFoundPage: React.FC = () => {
  const t = useT();
  const locale = useLocale();

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-bg-primary">
      <SEO title={`${t('notFound.title')} | Ashen Software`} description={t('notFound.body')} noindex />
      <Container className="relative z-10 flex flex-col items-center text-center py-24">
        <p className="text-sm font-bold tracking-widest text-brand-primary mb-4">404</p>
        <h1 className="text-4xl md:text-5xl font-black mb-4">{t('notFound.title')}</h1>
        <p className="text-text-secondary max-w-md mx-auto mb-10">{t('notFound.body')}</p>
        <Link to={pathFor('home', locale)}>
          <Button variant="primary">{t('notFound.home')}</Button>
        </Link>
      </Container>
    </div>
  );
};
