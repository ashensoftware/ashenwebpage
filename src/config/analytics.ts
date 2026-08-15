import { track as vercelTrack } from '@vercel/analytics';

export type AnalyticsEvent =
  | 'hero_primary_cta'
  | 'hero_case_studies'
  | 'ai_agents_cta'
  | 'service_cta'
  | 'case_study_open'
  | 'trengie_live_site'
  | 'contact_form_start'
  | 'contact_form_submit'
  | 'contact_form_success'
  | 'contact_form_error'
  | 'whatsapp_click';

export type AnalyticsProps = Record<string, string | number | boolean | undefined>;

const PII_KEYS = new Set([
  'email',
  'phone',
  'name',
  'message',
  'company',
  'fullName',
  'firstName',
  'lastName',
  'telephone',
  'tel',
  'workEmail',
  'body',
]);

declare global {
  interface Window {
    ashenTrack?: (event: string, props?: AnalyticsProps) => void;
  }
}

export function areCustomEventsEnabled(): boolean {
  return import.meta.env.VITE_ENABLE_VERCEL_CUSTOM_EVENTS === 'true';
}

export function sanitizeSourcePath(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return '/';

  try {
    const url = new URL(trimmed, 'https://ashensoftware.com');
    return url.pathname || '/';
  } catch {
    const withoutHash = trimmed.split('#')[0] ?? trimmed;
    const withoutQuery = withoutHash.split('?')[0] ?? withoutHash;
    return withoutQuery.startsWith('/') ? withoutQuery : `/${withoutQuery}`;
  }
}

export function sanitizeAnalyticsProps(props?: AnalyticsProps): Record<string, string | number | boolean> {
  if (!props) return {};

  const clean: Record<string, string | number | boolean> = {};

  for (const [key, value] of Object.entries(props)) {
    if (value === undefined) continue;
    if (PII_KEYS.has(key)) continue;

    if (key === 'source' && typeof value === 'string') {
      clean.source =
        value.startsWith('/') || /^https?:\/\//i.test(value)
          ? sanitizeSourcePath(value)
          : value;
      continue;
    }

    clean[key] = value;
  }

  return clean;
}

export function track(event: AnalyticsEvent, props?: AnalyticsProps): void {
  const clean = sanitizeAnalyticsProps(props);

  try {
    if (typeof window !== 'undefined' && typeof window.ashenTrack === 'function') {
      window.ashenTrack(event, clean);
    }
  } catch {
    // Optional local hook must never break UI.
  }

  if (!areCustomEventsEnabled()) return;

  try {
    vercelTrack(event, clean);
  } catch {
    // Custom events must never break UI.
  }
}
