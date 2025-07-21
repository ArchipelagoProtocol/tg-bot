import swc from 'unplugin-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'],
    globals: true,
    root: './',
  },
  resolve: {
    alias: {
      '@src': './src',
      '@test': './test',
      '@domains/*': './src/domains/*',
      '@infra/*': './src/infra/*',
      '@common/*': './src/common/*',
    },
  },
  plugins: [tsconfigPaths(), swc.vite({ module: { type: 'es6' } })],
})