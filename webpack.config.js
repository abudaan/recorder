/* eslint-disable */

const path = require("path");

module.exports = {
  // context: path.resolve(__dirname),
  // entry: "./src/index.tsx",
  entry: path.join(__dirname, "src", "index.ts"),
  devtool: "inline-source-map",
  mode: "development",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    // modules: ["node_modules", path.resolve(__dirname, "src")],
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.css$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // "css-modules-typescript-loader",
          // {
          //   loader: "css-loader",
          //   options: {
          //     modules: true,
          //   },
          // },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            onlyCompileBundledFiles: true,
          },
        },
      },
      {
        test: /\.(jpg|jpeg|gif|png|eot|woff|woff2|ttf|svg|ico)$/,
        loader: "file-loader?name=[name].[ext]",
      },

      // {
      //   test: /\.svg$/,
      //   use: {
      //     loader: "svg-inline-loader",
      //     options: {
      //       publicPath: "/",
      //     },
      //   },
      // },
    ],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9001,
    hot: false,
    inline: false,
    liveReload: false,
    // allowedHosts: ["192.168.0.13"],
    // disableHostCheck: true,
    host: "0.0.0.0",
  },
};
