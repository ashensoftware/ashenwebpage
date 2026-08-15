export interface CaseStudy {
  slug: string;
  liveUrl: string;
  image: string;
  stack: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'trengie',
    liveUrl: 'https://trengie.com',
    image: '/assets/case-studies/trengie.png',
    stack: ['React', 'TypeScript', 'Vite', 'Responsive UI'],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((study) => study.slug === slug);
}

export function caseStudyKey(slug: string, field: string) {
  return `cases.items.${slug}.${field}`;
}
