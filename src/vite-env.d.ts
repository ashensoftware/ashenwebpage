/// <reference types="vite/client" />
/// <reference types="vitest/globals" />

interface ImportMetaEnv {
  readonly VITE_ENABLE_VERCEL_CUSTOM_EVENTS?: string;
}

declare module '*.json' {
  const value: Record<string, unknown>;
  export default value;
}
