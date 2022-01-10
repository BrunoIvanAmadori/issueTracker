const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { DefinePlugin } = require("webpack");

module.exports = (env) => {
  return {
    devServer: {
      static: {
        directory: path.join(__dirname, "docs"),
      },
      compress: true,
      port: 9000,
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
        template: "src/index.html",
      }),
      new DefinePlugin({
        "process.env.TOKEN": JSON.stringify(env.TOKEN),
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
