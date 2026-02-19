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
    dts: { build: true },
    clean: true,
    external: ['ragemp-stub/shared', 'ragemp-stub/server', 'ragemp-stub/client', 'ragemp-stub/web'],
});
