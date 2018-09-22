const webpack = require('webpack');
const modules = ['node_modules', 'bower_components'];

module.exports = {
  
  mode: 'development',
  target: "electron-renderer",
  resolve: {
     modules: modules,
     descriptionFiles: ['package.json'],
     extensions: ['.js', '.json', '.html']
  },
  resolveLoader: {
    modules: modules,
    extensions: ['.js', '.json'],
    mainFields: ['loader', 'main']
  },
  context: __dirname,
  entry: __dirname+"/src/main.js",
  output: {
    path: __dirname+"/dist/js",
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
         loader: 'babel-loader',
         options: {
          presets: ['@babel/preset-env']
         }
        }
       }
     ]
   }
};