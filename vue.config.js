// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/docs" // This is whatever your path from the root is
      : "/"
};
