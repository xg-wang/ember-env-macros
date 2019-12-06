'use strict';

const { parseBabelPluginOptions } = require('./lib/utils');

module.exports = {
  name: require('./package').name,

  included(parent) {
    this._super.included.apply(this, arguments);
    if (this._registered) {
      return
    };

    const parentOptions = parent.options = parent.options || {};

    // Create babel options if they do not exist
    parentOptions.babel = parentOptions.babel || {};

    const plugins = parentOptions.babel.plugins = parentOptions.babel.plugins || [];
    const envPlugin = this._getEnvPlugin();
    plugins.push(envPlugin);

    this._registered = true;
  },

  _getEnvPlugin() {
    const buildEnv = parseBabelPluginOptions(this.app.options);
    const configEnv = parseBabelPluginOptions(this.project.config(this.app.env));
    return [require.resolve('./lib/env-plugin.js'), { buildEnv, configEnv } ];
  }
};
