import React, { useEffect, useRef, useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { useLocation } from 'react-router-dom';
import { WhatsAppIcon } from '@/components/icons/BrandIcons';
import { Button } from '@/components/ui/Button';
import { buttonClass } from '@/components/ui/button-styles';
import { Container } from '@/components/ui/Container';
import { COMPANY } from '@/config/company';
import { track } from '@/config/analytics';
import { useLocale, useT } from '@/hooks/useLocale';

const SERVICE_VALUES = ['ai-agents', 'software', 'data-ai', 'integrations', 'other'] as const;

const fieldClass =
  'min-h-11 w-full border border-[var(--input-border)] bg-[var(--input-bg)] px-3 py-2 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]';

export const ContactUs: React.FC = () => {
  const t = useT();
  const locale = useLocale();
  const { pathname } = useLocation();
  const [state, handleSubmit, reset] = useForm(COMPANY.formspreeFormKey);
  const [started, setStarted] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    if (state.succeeded) {
      track('contact_form_success', { locale, source: pathname });
    }
  }, [state.succeeded, locale, pathname]);

  useEffect(() => {
    if (state.errors) {
      track('contact_form_error', { locale });
    }
  }, [state.errors, locale]);

  const markStarted = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    setStarted(true);
    track('contact_form_start', { locale, source: pathname });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    track('contact_form_submit', { locale, source: pathname });
    void handleSubmit(event);
  };

  return (
    <section id="contact-us" className="bg-[var(--color-bg-secondary)] py-16 md:py-24" aria-labelledby="contact-title">
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-3">{t('nav.contact')}</p>
          <h2 id="contact-title" className="font-display text-4xl font-medium">
            {t('contact.title')}
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)]">{t('contact.description')}</p>
          <dl className="mt-8 space-y-4 text-sm">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">Email</dt>
              <dd>
                <a className="underline-offset-2 hover:underline" href={`mailto:${COMPANY.email}`}>
                  {COMPANY.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">WhatsApp</dt>
              <dd>
                <a
                  className="inline-flex min-h-11 items-center gap-2 underline-offset-2 hover:underline"
                  href={COMPANY.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('whatsapp_click', { source: 'contact_social' })}
                >
                  <WhatsAppIcon size={16} />
                  {COMPANY.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">{t('hero.meta.base')}</dt>
              <dd>{COMPANY.location}</dd>
            </div>
          </dl>
        </div>

        <div className="glass-card p-6 md:p-8 lg:col-span-7">
          {state.succeeded ? (
            <div role="status" aria-live="polite" className="space-y-6">
              <h3 className="font-display text-3xl">{t('contact.success-title')}</h3>
              <p className="text-[var(--color-text-secondary)]">{t('contact.success-body')}</p>
              <a
                href={COMPANY.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClass({ variant: 'secondary', size: 'lg', className: 'w-full' })}
                onClick={() => track('whatsapp_click', { source: 'contact_success' })}
              >
                <WhatsAppIcon size={18} />
                {t('cta.talkWhatsapp')}
              </a>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5" noValidate>
              <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
              <input type="hidden" name="source" value={pathname} />
              <input type="hidden" name="locale" value={locale} />

              <div className="grid gap-5 md:grid-cols-2">
                <Field id="name" name="name" label={t('contact.name-label')} required className={fieldClass} onFocus={markStarted} errors={state.errors} />
                <Field id="company" name="company" label={t('contact.company-label')} className={fieldClass} onFocus={markStarted} errors={state.errors} />
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <Field id="email" name="email" type="email" label={t('contact.email-label')} required autoComplete="email" className={fieldClass} onFocus={markStarted} errors={state.errors} />
                <Field id="phone" name="phone" type="tel" label={t('contact.phone-label')} autoComplete="tel" className={fieldClass} onFocus={markStarted} errors={state.errors} />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="service" className="text-sm">
                  {t('contact.service-label')}
                </label>
                <select id="service" name="service" className={fieldClass} defaultValue="" onFocus={markStarted}>
                  <option value="">{t('contact.service-options.select')}</option>
                  {SERVICE_VALUES.map((value) => (
                    <option key={value} value={value}>
                      {t(`contact.service-options.${value}`)}
                    </option>
                  ))}
                  <option value="not-sure">{t('contact.service-options.not-sure')}</option>
                </select>
                <ValidationError prefix="Service" field="service" errors={state.errors} />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm">
                  {t('contact.message-label')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  minLength={10}
                  maxLength={5000}
                  className={`${fieldClass} min-h-32 resize-y`}
                  placeholder={t('contact.message-placeholder')}
                  onFocus={markStarted}
                  aria-describedby="message-error form-error"
                />
                <ValidationError id="message-error" prefix="Message" field="message" errors={state.errors} />
              </div>

              <div id="form-error" aria-live="polite" className="min-h-5 text-sm text-[#c4492c]">
                {state.errors ? t('contact.error-generic') : started ? '' : null}
                <ValidationError errors={state.errors} />
              </div>

              <Button type="submit" size="lg" variant="primary" disabled={state.submitting} className="w-full">
                {state.submitting ? t('contact.sending') : t('contact.button')}
              </Button>
              {state.errors ? (
                <button type="button" onClick={() => reset()} className="min-h-11 text-sm underline-offset-2 hover:underline">
                  {t('contact.retry')}
                </button>
              ) : null}
            </form>
          )}
        </div>
      </Container>
    </section>
  );
};

interface FieldProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  className: string;
  autoComplete?: string;
  onFocus: () => void;
  errors: ReturnType<typeof useForm>[0]['errors'];
}

function Field({ id, name, label, type = 'text', required, className, autoComplete, onFocus, errors }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className={className}
        onFocus={onFocus}
        aria-describedby={`${id}-error`}
      />
      <ValidationError id={`${id}-error`} prefix={label} field={name} errors={errors} />
    </div>
  );
}
