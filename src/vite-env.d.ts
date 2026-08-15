/// <reference types="vite/client" />
/// <reference types="vitest/globals" />

declare module '*.json' {
  const value: Record<string, unknown>;
  export default value;
}
