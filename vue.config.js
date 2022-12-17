const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      // less 的路径
      patterns: [path.resolve(__dirname, './src/assets/css/global.less')]
    }
  }
});
