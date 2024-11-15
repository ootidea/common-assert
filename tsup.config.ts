import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  treeshake: true,
  clean: true,
  define: {
    // for https://vitest.dev/guide/in-source
    'import.meta.vitest': 'undefined',
  },
})
