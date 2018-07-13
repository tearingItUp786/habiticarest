const path = require('path');
const webpack = require('webpack');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

function handleWebpackMode(mode = 'production') {
  console.log(mode);

  let entry = ['./js/ClientApp.jsx'];
  let devtool = 'none';
  let devServer = {};
  const plugins = [
    new BundleAnalyzerPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ];

  if (mode !== 'production') {
    entry = [
      'babel-polyfill',
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:786',
      'webpack/hot/only-dev-server',
      './js/ClientApp.jsx'
    ];

    devtool = 'source-map';
    devServer = {
      hot: true,
      publicPath: '/public/',
      historyApiFallback: true,
      port: 786
    };

    plugins.unshift(new webpack.HotModuleReplacementPlugin());
  }

  return { entry, devtool, devServer, plugins };
}

module.exports = ({ mode } = { mode: 'production' }) => ({
  mode,
  ...handleWebpackMode(mode),
  context: __dirname,
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        use: [{ loader: 'eslint-loader' }, { loader: 'stylelint-custom-processor-loader' }],
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
});
