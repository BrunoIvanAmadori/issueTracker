const path = require("path");

module.exports = {
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "docs"),
    },
    compress: true,
    port: 9000,
  },
};
