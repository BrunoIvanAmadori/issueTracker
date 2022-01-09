const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

var config;

module.exports = (env) => {
  if (env.production) {
    config = require("./src/config/config-production.js");
  } else {
    config = require("./src/config/config-development.js");
  }

  console.log(config.mode);

  return {
    ...config,
    plugins: [
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
        template: "src/index.html",
      }),
    ],
    entry: "./src/js/index.js",
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "docs"),
    },
    module: {
      rules: [
        {
          test: /\.njk$/,
          use: [
            {
              loader: "simple-nunjucks-loader",
              options: {
                assetsPaths: ["./src/img"],
              },
            },
          ],
        },
        {
          test: /\.png$/,
          use: [
            {
              loader: "file-loader",
            },
          ],
        },
        {
          test: /\.html$/i,
          loader: "html-loader",
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },

        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
      ],
    },
  };
};
