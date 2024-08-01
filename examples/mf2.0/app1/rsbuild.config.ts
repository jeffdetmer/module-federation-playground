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
    port: 3001,
    open: false,
  },
  dev: {
    assetPrefix: 'http://localhost:3001',
  },
  output: {
    assetPrefix: '/',
    filenameHash: true,
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
          name: 'app1',
          filename: 'remoteEntry.js',
          exposes: {
            './router': './src/router',
          },
          shared: {
            react: {
              singleton: true,
              requiredVersion: dependencies.react,
            },
            'react-dom': {
              singleton: true,
              requiredVersion: dependencies.react,
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
