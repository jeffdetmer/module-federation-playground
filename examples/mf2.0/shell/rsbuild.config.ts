import { resolve } from 'node:path';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';
import { defineConfig } from '@rsbuild/core';
import { pluginLightningcss } from '@rsbuild/plugin-lightningcss';
import { pluginReact } from '@rsbuild/plugin-react';
import { TanStackRouterRspack } from '@tanstack/router-plugin/rspack';
import { dependencies } from './package.json';

export default defineConfig({
  source: {
    entry: {
      index: './src/index.ts',
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  dev: {
    hmr: true,
    liveReload: true,
    progressBar: true,
    assetPrefix: 'http://localhost:3000',
  },
  output: {
    cleanDistPath: true,
    minify: true,
    polyfill: 'usage',
    assetPrefix: '/',
    filenameHash: true,
    charset: 'utf8',
  },
  security: {
    nonce: 'kwri',
    sri: {
      enable: true,
      algorithm: 'sha512',
    },
  },
  tools: {
    rspack: (config, { appendPlugins }) => {
      config.resolve ||= {};
      config.resolve.alias ||= {};
      config.resolve.alias['@'] = resolve(__dirname, 'src');

      appendPlugins([
        new ModuleFederationPlugin({
          name: 'shell',
          exposes: {
            './commandAxios': './src/utils/commandAxios',
          },
          remotes: {
            '@remote/app1': 'app1@http://localhost:3001/mf-manifest.json',
          },
          shared: {
            react: {
              singleton: true,
              requiredVersion: dependencies.react,
            },
            'react-dom': {
              singleton: true,
              requiredVersion: dependencies['react-dom'],
            },
            'react-is': {
              singleton: true,
              requiredVersion: dependencies['react-is'],
            },
          },
        }),
        TanStackRouterRspack({
          quoteStyle: 'single',
          semicolons: false,
          disableTypes: false,
          experimental: {
            enableCodeSplitting: true,
          },
        }),
      ]);
    },
  },
  plugins: [
    pluginReact({
      splitChunks: {
        react: false,
        router: false,
      },
      reactRefreshOptions: {
        overlay: true,
      },
    }),
    pluginLightningcss(),
  ],
});
