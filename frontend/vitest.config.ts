import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts', // o .js si prefieres
    globals: true // Opcional: para usar describe, it, expect sin importar nada
  },
});