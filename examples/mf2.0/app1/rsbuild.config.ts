import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';
import { defineConfig } from '@rsbuild/core';
import { pluginAssetsRetry } from '@rsbuild/plugin-assets-retry';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginStyledComponents } from '@rsbuild/plugin-styled-components';
import { pluginSvgr } from '@rsbuild/plugin-svgr';
import { pluginTypeCheck } from '@rsbuild/plugin-type-check';
import { TanStackRouterRspack } from '@tanstack/router-plugin/rspack';
import { pluginOpenGraph } from 'rsbuild-plugin-open-graph';
import { pluginReactInspector } from 'rsbuild-plugin-react-inspector';
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
  environments: {
    dev: {
      output: {
        distPath: {
          root: 'dist-dev',
        },
        assetPrefix: 'https://ui-console-login.kw-dev-us-east1.kw.com/',
      },
      plugins: [
        pluginOpenGraph({
          title: 'Shell',
          type: 'website',
          url: 'https://console-dev.command.kw.com',
          description: 'shell for command',
        }),
        pluginReactInspector(),
      ],
    },
    qa: {
      output: {
        distPath: {
          root: 'dist-qa',
        },
        assetPrefix: 'https://ui-console-login.kw-qa-us-east1.kw.com/',
      },
      plugins: [
        pluginOpenGraph({
          title: 'Shell',
          type: 'website',
          url: 'https://console-qa.command.kw.com',
          description: 'shell for command',
        }),
      ],
    },
    prod: {
      output: {
        distPath: {
          root: 'dist-prod',
        },
        assetPrefix: 'https://ui-console-login.kw-prod-us-east1.kw.com/',
      },
      plugins: [
        pluginOpenGraph({
          title: 'Shell',
          type: 'website',
          url: 'https://console.command.kw.com',
          description: 'shell for command',
        }),
      ],
    },
  },
  tools: {
    rspack: (_config, { appendPlugins }) => {
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
    pluginSvgr(),
    pluginTypeCheck(),
    pluginAssetsRetry(),
    pluginStyledComponents({
      namespace: 'shell',
      meaninglessFileNames: ['index', 'styles'],
      pure: true,
    }),
  ],
});
