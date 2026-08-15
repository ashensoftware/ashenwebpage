export const COMPANY = {
  legalName: 'Ashen Software',
  displayName: 'Ashen Software',
  domain: 'ashensoftware.com',
  origin: 'https://ashensoftware.com',
  email: 'softwareashen@gmail.com',
  phoneDisplay: '+57 310 560 2568',
  phoneE164: '+573105602568',
  whatsappUrl: 'https://wa.me/573105602568',
  location: 'Medellín, Colombia',
  logoPath: '/assets/logo/Logo-Iso.png',
  ogImagePath: '/assets/og-image.png',
  formspreeProjectId: '3068620315652259392',
  formspreeFormKey: 'contactForm',
  social: {
    linkedin: 'https://www.linkedin.com/company/ashen-software',
    instagram: 'https://www.instagram.com/ashensoftware',
    github: 'https://github.com/ashensoftware',
  },
} as const;

export const COMPANY_SAME_AS = [
  COMPANY.social.linkedin,
  COMPANY.social.instagram,
  COMPANY.social.github,
] as const;

export function absoluteUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${COMPANY.origin}${normalized === '/' ? '/' : normalized}`;
}

export function assetUrl(path: string): string {
  return absoluteUrl(path);
}
