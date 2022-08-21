/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/main.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      templateContent: `
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>Phaser</title>
          <style>body {margin: 0;overflow: hidden;}</style>
        </head>
        <body>
          <div id="game"></div>
        </body>
      </html>
      `,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./assets/**/*",
          to: "./",
        },
      ],
    }),
    /*new webpack.DefinePlugin({
      "typeof CANVAS_RENDERER": JSON.stringify(true),
      "typeof WEBGL_RENDERER": JSON.stringify(true),
    }),*/
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /node_modules/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
};
