import { defineConfig } from 'tsdown';

export default defineConfig({
    entry: {
        shared: './src/shared/index.ts',
        server: './src/server/index.ts',
        client: './src/client/index.ts',
        web: './src/web/index.ts',
    },
    outDir: './dist',
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    external: ['ragemp-atlas/shared'],
});
