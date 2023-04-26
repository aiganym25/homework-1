const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = {
  devtool: "eval-source-map",
  entry: "./src/index.ts", //entry point for webpack
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        include: [path.resolve(__dirname, "src")],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        include: [path.resolve(__dirname, "src")],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    publicPath: "auto",
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"), //absolute path
  },
  plugins: [new HtmlWebpackPlugin({ template: "index.html" })],
  mode: "development",
};
