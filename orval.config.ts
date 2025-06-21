import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: {
      target: 'http://tenant1.localhost:8080/api/v3/api-docs',
    },
    output: {
      target: './src/lib/api/generated.ts',
      client: 'react-query',
      mode: 'single',
      prettier: true,
      override: {
        mutator: {
          path: './src/lib/api/axios-instance.ts',
          name: 'customInstance',
        },
      },
      tsconfig: './tsconfig.orval.json'
    },
  },
});
