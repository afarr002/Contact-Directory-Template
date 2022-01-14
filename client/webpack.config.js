import HtmlWebpackPlugin from "html-webpack-plugin";
import WebpackPwaManifest from "webpack-pwa-manifest";
import path from "path";
import { GenerateSW } from "workbox-webpack-plugin";

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
      cards: "./src/js/cards.js",
    },

    output: {
      fielname: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Contact Directory (template)",
      }),

      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),

      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "Contact Directory (template)",
        short_name: "Contact Directory",
        description: "Template for functionality of a Contact Directory",
        background_color: "#FB4F14",
        theme_color: "#FB4F14",
        start_url: "/",
        publicPath: "/",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
