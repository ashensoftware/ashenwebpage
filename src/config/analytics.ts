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

type AnalyticsProps = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    ashenTrack?: (event: string, props?: AnalyticsProps) => void;
  }
}

export function track(event: AnalyticsEvent, props?: AnalyticsProps): void {
  if (typeof window === 'undefined') return;

  if (typeof window.ashenTrack === 'function') {
    window.ashenTrack(event, props);
  }
}
