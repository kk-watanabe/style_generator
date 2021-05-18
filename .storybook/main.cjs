const path = require("path")

module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx|svelte)",
  ],
    typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  webpackFinal: async (config) => {
    config.resolve.alias = {
      "$const": path.resolve(__dirname, "../src/const"),
      "$lib": path.resolve(__dirname, "../src/lib"),
    };

    const svelteLoader = config.module.rules.find( (r) => r.loader && r.loader.includes('svelte-loader'))
    svelteLoader.options.preprocess = require('svelte-preprocess')()

    return config
  },
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-svelte-csf",
  ],
};
