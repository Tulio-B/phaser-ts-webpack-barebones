/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require("webpack-merge");
const config = require("./webpack.config.js");

module.exports = merge(config, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    port: 8000,
  },
});