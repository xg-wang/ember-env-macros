# ember-env-macros

[![npm version](https://badge.fury.io/js/ember-env-macros.svg)](https://badge.fury.io/js/ember-env-macros)
[![Build Status](https://travis-ci.com/xg-wang/ember-env-macros.svg?branch=master)](https://travis-ci.com/xg-wang/ember-env-macros)

Get both build and runtime configurations in Ember app or addon.

## Compatibility

- Ember.js v3.4 or above
- Ember CLI v2.13 or above
- Node.js v8 or above

## Installation

```
yarn add ember-env-macros
```

## Usage

If you have build env:

```js
// ember-cli-build.js
module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {
    'some-config': {
      buildKey: true,
      nestedKey: {
        key: 'build',
      },
    },
  });

  return app.toTree();
};
```

and config env:

```js
module.exports = function(environment) {
  let ENV = {
    // ...
    'some-config': {
      envKey: false,
      nestedKey: {
        key: 'config',
      },
    },
}
```

You can get access to them via:

```js
import { configEnv, buildEnv } from 'ember-env-macros';

let model = {
  config: {
    envValue: configEnv('some-config.envKey'),
    nestedValue: configEnv('some-config.nestedKey.key'),
    defaultValue: configEnv('some-config.missingKey', 'default'),
  },
  build: {
    buildValue: buildEnv('some-config.buildKey'),
    nestedValue: buildEnv('some-config.nestedKey.key'),
    defaultValue: buildEnv('some-config.missingKey', 'default'),
  },
};
```

The build output will be:

```js
var model = {
  config: {
    envValue: false,
    nestedValue: 'config',
    defaultValue: 'default',
  },
  build: {
    buildValue: true,
    nestedValue: 'build',
    defaultValue: 'default',
  },
};
```

When used in an addon or engine, both config and build envs are from the host app.

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
