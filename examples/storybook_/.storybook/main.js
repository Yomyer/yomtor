// eslint-disable-next-line import/no-extraneous-dependencies
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  stories: ["../src/*.stories.tsx", "../../../packages/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-dark-mode/register",
  ],
  framework: "@storybook/react",
  core: { builder: "webpack5" },
  webpackFinal: async (config) => {
    // eslint-disable-next-line no-param-reassign
    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsconfigPathsPlugin({
        extensions: config.resolve.extensions,
      }),
    ];

    return config;
  },
};
