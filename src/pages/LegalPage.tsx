import React from 'react';
import { useT } from '@/hooks/useLocale';
import { Container } from '@/components/ui/Container';
import { SEO } from '@/components/SEO';
import { COMPANY } from '@/config/company';

interface LegalPageProps {
  kind: 'privacy' | 'terms';
}

export default function LegalPage({ kind }: LegalPageProps) {
  const t = useT();
  const isPrivacy = kind === 'privacy';
  const vars = {
    legalName: COMPANY.legalName,
    domain: COMPANY.domain,
  };

  return (
    <div className="min-h-screen bg-bg-primary pt-32 pb-24">
      <SEO
        title={isPrivacy ? t('legal.privacyTitle') : t('legal.termsTitle')}
        description={isPrivacy ? t('legal.privacyDesc') : t('legal.termsDesc')}
      />
      <Container className="max-w-3xl prose prose-invert">
        <h1>{isPrivacy ? t('footer.privacy') : t('footer.terms')}</h1>
        <p className="text-sm text-text-muted">{t('legal.disclaimer')}</p>

        {isPrivacy ? (
          <>
            <p>{t('legal.privacy.collects', vars)}</p>
            <p>{t('legal.privacy.formspree')}</p>
            <p>{t('legal.privacy.analytics')}</p>
            <p>
              {t('legal.privacy.questions')}{' '}
              <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
            </p>
          </>
        ) : (
          <>
            <p>{t('legal.terms.services', vars)}</p>
            <p>{t('legal.terms.use')}</p>
            <p>
              {t('legal.terms.contact')}{' '}
              <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
            </p>
          </>
        )}
      </Container>
    </div>
  );
}
