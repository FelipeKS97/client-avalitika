var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    path: path.resolve('./public'),
    publicPath: '/',
    filename: 'app.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css', '.json', '.svg'],
    alias: {
      "jquery": path.join(__dirname, "./config/jquery-stub.js")
    }
  },
  plugins: [
    //
  ],
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
  devServer: {
    port: 8080,
    host: "localhost",
    historyApiFallback: true,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    watchOptions: {aggregateTimeout: 300, poll: 1000},
    contentBase: './public',
    open: true,
    proxy: {
      "/api/*": "http://127.0.0.1:5005"
    }
  }
};
