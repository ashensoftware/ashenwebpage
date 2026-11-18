import type { ServicePillar } from './pillars';

export interface CapabilityGroup {
  pillarId: ServicePillar['id'];
  ids: string[];
  secondary: string[];
}

export const CAPABILITY_GROUPS: CapabilityGroup[] = [
  { pillarId: 'ai-agents', ids: ['artificial-intelligence'], secondary: [] },
  {
    pillarId: 'software',
    ids: ['web-development', 'mobile-development', 'desktop-apps'],
    secondary: ['game-development'],
  },
  {
    pillarId: 'data-ai',
    ids: ['data-science', 'machine-learning', 'deep-learning'],
    secondary: [],
  },
  {
    pillarId: 'integrations',
    ids: ['automation', 'iot-solutions'],
    secondary: ['blockchain'],
  },
];

export function allCapabilityIds(): string[] {
  return CAPABILITY_GROUPS.flatMap((group) => [...group.ids, ...group.secondary]);
}
