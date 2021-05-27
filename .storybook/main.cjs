const sveltePreprocess = require("svelte-preprocess");
const path = require("path")

module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx|svelte)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-svelte-csf",
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
  webpackFinal: async config => {
    config.resolve.alias = {
      "$const": path.resolve(__dirname, "../src/const"),
      "$lib": path.resolve(__dirname, "../src/lib"),
      "$util": path.resolve(__dirname, "../src/util"),
      "$models": path.resolve(__dirname, "../src/models"),
    };

    config.module.rules.push({
      test: /\.ts?$/,
      use: [
        {
          loader: require.resolve("ts-loader"),
          options: {
            transpileOnly: true,
            configFile: path.resolve(__dirname, "./tsconfig.json")
          }
        }
      ]
    });

    const svelteLoader = config.module.rules.find(r => r.loader && r.loader.includes("svelte-loader"));

    svelteLoader.options = {
      ...svelteLoader.options,
      preprocess: sveltePreprocess(),
    };

    return config;
  }
};
