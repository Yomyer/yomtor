// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path')
const { argv } = require('yargs')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const storiesPath = !argv._[0]
    ? path
          .resolve(__dirname, '../../../packages/**/*.stories.@(ts|tsx)')
          .replace(/\\/g, '/')
    : path
          .resolve(
              __dirname,
              `../../../packages/${argv._[0].replace(
                  '@yomtor/',
                  ''
              )}/**/*.stories.@(ts|tsx)`
          )
          .replace(/\\/g, '/')

module.exports = {
    stories: [storiesPath],
    addons: ['storybook-addon-turbo-build', 'storybook-dark-mode'],
    webpackFinal: async (config) => {
        config.resolve = {
            ...config.resolve,
            plugins: [
                ...(config.resolve.plugins || []),
                new TsconfigPathsPlugin({
                    extensions: ['.ts', '.tsx', '.js'],
                    configFile: path.join(__dirname, '../../../tsconfig.json')
                })
            ]
        }

        // Turn off docgen plugin as it breaks bundle with displayName
        config.plugins.pop()

        return config
    }
}
