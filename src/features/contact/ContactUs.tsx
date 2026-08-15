import React, { useEffect, useRef, useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Linkedin, Instagram, Mail } from 'lucide-react';
import { WhatsAppIcon } from '@/components/icons/BrandIcons';
import { Section } from '../../components/ui/Section';
import { Button } from '../../components/ui/Button';
import { Container } from '../../components/ui/Container';
import { Typography } from '../../components/ui/Typography';
import { COMPANY } from '@/config/company';
import { track } from '@/config/analytics';
import { useLocale, useT } from '@/hooks/useLocale';

const SERVICE_VALUES = ['ai-agents', 'software', 'data-ai', 'integrations', 'other'] as const;

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

  const fieldClass =
    'bg-[var(--input-bg)] border border-[var(--input-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] placeholder-text-muted focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all w-full';

  return (
    <Section id="contact-us" className="bg-bg-secondary relative py-0" fullWidth>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-bg-primary to-transparent z-10 pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
        <div className="relative flex items-center justify-center lg:justify-end py-24 px-6 lg:px-12">
          <Container className="relative z-10 w-full max-w-xl mx-auto lg:mx-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:text-right"
            >
              <Typography variant="h2" className="mb-6 inline-flex items-center gap-3">
                <Mail className="text-brand-primary shrink-0" size={28} />
                {t('contact.title')}
              </Typography>
              <Typography variant="lead" className="mb-8 text-text-secondary/80">
                {t('contact.description')}
              </Typography>
              <div className="flex gap-4 justify-center lg:justify-end">
                <a
                  href={COMPANY.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href={COMPANY.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:bg-brand-secondary hover:text-white hover:border-brand-secondary transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href={COMPANY.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('whatsapp_click', { source: 'contact_social' })}
                  className="p-3 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-300"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon size={24} />
                </a>
              </div>
            </motion.div>
          </Container>
        </div>

        <div className="relative flex items-center justify-center lg:justify-start py-24 px-6 lg:px-12 bg-bg-primary/20">
          <div className="absolute inset-0 bg-brand-primary/5 blur-[120px] rounded-full -z-10" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card p-8 lg:p-12 rounded-2xl w-full max-w-xl border-black/5 dark:border-white/5 shadow-2xl relative z-10"
          >
            {state.succeeded ? (
              <div role="status" aria-live="polite" className="space-y-6">
                <Typography variant="h3">{t('contact.success-title')}</Typography>
                <p className="text-text-secondary">{t('contact.success-body')}</p>
                <a
                  href={COMPANY.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('whatsapp_click', { source: 'contact_success' })}
                >
                  <Button type="button" size="lg" variant="secondary" className="w-full">
                    <WhatsAppIcon size={18} />
                    {t('cta.talkWhatsapp')}
                  </Button>
                </a>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-6" noValidate>
                <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
                <input type="hidden" name="source" value={pathname} />
                <input type="hidden" name="locale" value={locale} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field
                    id="name"
                    name="name"
                    label={t('contact.name-label')}
                    required
                    className={fieldClass}
                    onFocus={markStarted}
                    errors={state.errors}
                  />
                  <Field
                    id="company"
                    name="company"
                    label={t('contact.company-label')}
                    className={fieldClass}
                    onFocus={markStarted}
                    errors={state.errors}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    label={t('contact.email-label')}
                    required
                    autoComplete="email"
                    className={fieldClass}
                    onFocus={markStarted}
                    errors={state.errors}
                  />
                  <Field
                    id="phone"
                    name="phone"
                    type="tel"
                    label={t('contact.phone-label')}
                    autoComplete="tel"
                    className={fieldClass}
                    onFocus={markStarted}
                    errors={state.errors}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="service" className="text-sm text-text-secondary font-medium">
                    {t('contact.service-label')}
                  </label>
                  <select
                    id="service"
                    name="service"
                    className={`${fieldClass} [color-scheme:inherit]`}
                    defaultValue="ai-agents"
                    onFocus={markStarted}
                  >
                    {SERVICE_VALUES.map((value) => (
                      <option key={value} value={value}>
                        {t(`contact.service-options.${value}`)}
                      </option>
                    ))}
                  </select>
                  <ValidationError prefix="Service" field="service" errors={state.errors} />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm text-text-secondary font-medium">
                    {t('contact.message-label')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    minLength={10}
                    maxLength={5000}
                    className={`${fieldClass} min-h-[120px] resize-none`}
                    placeholder={t('contact.message-placeholder')}
                    onFocus={markStarted}
                    aria-describedby="message-error form-error"
                  />
                  <ValidationError
                    id="message-error"
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                  />
                </div>

                <div id="form-error" aria-live="polite" className="min-h-[1.25rem] text-sm text-red-400">
                  {state.errors ? t('contact.error-generic') : started ? '' : null}
                  <ValidationError errors={state.errors} />
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    type="submit"
                    size="lg"
                    variant="primary"
                    disabled={state.submitting}
                    className="w-full py-4 text-lg font-bold bg-gradient-to-r from-brand-primary to-brand-secondary hover:opacity-90 shadow-lg shadow-brand-primary/20"
                  >
                    {state.submitting ? t('contact.sending') : t('contact.button')}
                  </Button>
                  {state.errors ? (
                    <button
                      type="button"
                      onClick={() => reset()}
                      className="text-sm text-text-secondary hover:text-brand-primary underline-offset-2 hover:underline"
                    >
                      {t('contact.retry')}
                    </button>
                  ) : null}
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-bg-secondary to-transparent z-20 pointer-events-none" />
    </Section>
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
      <label htmlFor={id} className="text-sm text-text-secondary font-medium">
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
