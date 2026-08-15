import type { RouteId } from '@/config/routes';

export interface ServicePillar {
  id: 'ai-agents' | 'software' | 'data-ai' | 'integrations';
  routeId: RouteId;
  icon: 'bot' | 'code' | 'database' | 'workflow';
}

export const SERVICE_PILLARS: ServicePillar[] = [
  { id: 'ai-agents', routeId: 'aiAgents', icon: 'bot' },
  { id: 'software', routeId: 'software', icon: 'code' },
  { id: 'data-ai', routeId: 'dataAi', icon: 'database' },
  { id: 'integrations', routeId: 'integrations', icon: 'workflow' },
];
