var path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('./dist'),
    publicPath: '/',
    filename: 'app.js',
    library: 'ReactFormBuilder',
    libraryTarget: 'umd'
  },

  externals: {
    //don't bundle the 'react' npm package with our bundle.js
    //but get it from a global 'React' variable
    // 'react': 'react',
    // 'react-dom': 'react-dom',
    // 'react-datepicker': 'react-datepicker',
    // 'classnames': 'classnames',
    // 'jquery': 'jquery',
    'bootstrap': 'bootstrap'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css', '.json', '.svg'],
    alias: {
      "jquery": path.join(__dirname, "./config/jquery-stub.js")
    }
  },

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js|.jsx?$/,
        use: [
          { loader: 'babel-loader' }
        ]
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: [
           { loader: 'file-loader' }
         ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader', options: {
              sassOptions: {
                includePaths: ['./node_modules'],
              },
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: "./public/index.html",
        favicon: "./public/images/favicon.ico",
        filename: 'index.html',
        inject: 'body'
    })
  ],
  performance: {
    hints: false
  }
};