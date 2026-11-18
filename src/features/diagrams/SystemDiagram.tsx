import React from 'react';

interface SystemDiagramProps {
  label: string;
  operator: string;
  agent: string;
  tools: string;
  records: string;
  approval: string;
  caption: string;
}

const nodes = [
  { key: 'operator', x: 16 },
  { key: 'agent', x: 168 },
  { key: 'tools', x: 320 },
  { key: 'records', x: 472 },
] as const;

export const SystemDiagram: React.FC<SystemDiagramProps> = ({
  label,
  operator,
  agent,
  tools,
  records,
  approval,
  caption,
}) => {
  const text: Record<(typeof nodes)[number]['key'], string> = { operator, agent, tools, records };

  return (
    <figure className="panel w-full p-4 md:p-6">
      <figcaption className="eyebrow mb-4">{label}</figcaption>
      <svg viewBox="0 0 640 280" role="img" aria-label={caption} className="h-auto w-full">
        <title>{caption}</title>
        {nodes.slice(0, -1).map((node, index) => {
          const next = nodes[index + 1];
          return (
            <line
              key={node.key}
              x1={node.x + 112}
              y1={78}
              x2={next.x}
              y2={78}
              stroke="currentColor"
              strokeOpacity="0.35"
            />
          );
        })}
        {nodes.map((node) => (
          <g key={node.key}>
            <rect x={node.x} y={46} width="112" height="64" fill="none" stroke="currentColor" strokeOpacity="0.55" />
            <text
              x={node.x + 56}
              y={84}
              textAnchor="middle"
              fill="currentColor"
              fontFamily="DM Mono, ui-monospace, monospace"
              fontSize="13"
            >
              {text[node.key]}
            </text>
          </g>
        ))}
        <line x1="224" y1="110" x2="224" y2="168" stroke="currentColor" strokeOpacity="0.35" />
        <rect x="168" y="168" width="200" height="52" fill="none" stroke="currentColor" />
        <text
          x="268"
          y="199"
          textAnchor="middle"
          fill="currentColor"
          fontFamily="DM Mono, ui-monospace, monospace"
          fontSize="13"
        >
          {approval}
        </text>
      </svg>
      <p className="mt-3 text-sm text-[var(--color-text-secondary)]">{caption}</p>
    </figure>
  );
};

export const StackDiagram: React.FC<{ layers: string[] }> = ({ layers }) => (
  <div className="flex flex-col gap-2" aria-hidden>
    {layers.map((layer, index) => (
      <div
        key={layer}
        className="border border-[var(--color-line-strong)] px-3 py-2 font-mono text-xs tracking-wide"
        style={{ marginLeft: `${index * 12}px` }}
      >
        {layer}
      </div>
    ))}
  </div>
);

export const PipelineDiagram: React.FC<{ steps: string[] }> = ({ steps }) => (
  <ol className="space-y-0" aria-hidden>
    {steps.map((step, index) => (
      <li key={step} className="border-l border-[var(--color-accent-primary)] py-2 pl-4 font-mono text-xs">
        <span className="text-[var(--color-text-muted)]">0{index + 1} </span>
        {step}
      </li>
    ))}
  </ol>
);

export const IntegrationDiagram: React.FC<{ nodes: string[] }> = ({ nodes: labels }) => (
  <div className="grid grid-cols-3 gap-2" aria-hidden>
    {labels.map((item) => (
      <div key={item} className="border border-[var(--color-line-strong)] px-2 py-3 text-center font-mono text-[11px] leading-tight">
        {item}
      </div>
    ))}
  </div>
);
