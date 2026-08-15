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
            <p>
              {COMPANY.legalName} ({COMPANY.domain}) collects the information you send through the contact form:
              name, company, work email, optional phone, project interest, message, and the page/locale you sent it from.
            </p>
            <p>
              That information is processed by Formspree to deliver a notification to {COMPANY.email}.
              We use it only to respond to project inquiries. We do not sell it.
            </p>
            <p>
              The site may store a theme preference in your browser. We do not run a third-party analytics product
              on this site unless one is added later and this page is updated.
            </p>
            <p>
              Questions: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
            </p>
          </>
        ) : (
          <>
            <p>
              This website describes software and consulting services offered by {COMPANY.legalName}.
              Content is informational. It is not a binding offer, and project scope is agreed in writing.
            </p>
            <p>
              You may not scrape, copy or present this site as your own product. Trademarks and client names
              remain their owners&apos;. Case studies describe work Ashen delivered; they do not imply endorsement
              beyond the public facts stated on the page.
            </p>
            <p>
              Contact: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
            </p>
          </>
        )}
      </Container>
    </div>
  );
}
