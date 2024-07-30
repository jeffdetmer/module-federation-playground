const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const path = require('path');

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3002,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    }
  },
  output: {
    publicPath: 'auto',
    globalObject: 'this',
    hashFunction: 'xxhash64'
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
          cacheDirectory: true,
          cacheCompression: false,
          compact: false,
          plugins: [
            [
              'babel-plugin-styled-components',
              {
                displayName: true,
                pure: true,
                namespace: 'app1',
              },
            ],
          ],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app2',
      filename: 'remoteEntry.js',
      exposes: {
        './App2': './src/App',
      },
      shared: [
        'styled-components',
        { react: { singleton: true }, 'react-dom': { singleton: true } },
      ],
    }),
    new CaseSensitivePathsPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
