import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  // Lit component classes register themselves via @customElement() and are
  // consumed by tag name in HTML templates — knip cannot trace that usage.
  ignoreExportsUsedInFile: true,
};

export default config;
