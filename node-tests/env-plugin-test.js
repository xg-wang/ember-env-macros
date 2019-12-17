/* eslint-env jest */
const { transformSync } = require('@babel/core');
const EnvPlugin = require('../lib/env-plugin');

test('works', () => {
  const { code } = transformSync(
    `import { configEnv, buildEnv } from 'ember-env-macros';
configEnv('string')
configEnv('number')
configEnv('boolean')
buildEnv('string')
buildEnv('number')
buildEnv('boolean')`,
    {
      plugins: [
        [
          EnvPlugin,
          {
            configEnv: {
              string: 'config',
              number: 1,
              boolean: true,
            },
            buildEnv: {
              string: 'build',
              number: 2,
              boolean: false,
            },
          },
        ],
      ],
    }
  );
  expect(code).toMatchSnapshot();
});

test('dot separeted key', () => {
  const { code } = transformSync(
    `import { configEnv, buildEnv } from 'ember-env-macros';
configEnv('some.key')
buildEnv('another.key')`,
    {
      plugins: [
        [
          EnvPlugin,
          {
            configEnv: {
              some: {
                key: 'value',
              },
            },
            buildEnv: {
              another: {
                key: 'eulav',
              },
            },
          },
        ],
      ],
    }
  );
  expect(code).toMatchSnapshot();
});

test('default value', () => {
  const { code } = transformSync(
    `import { configEnv, buildEnv } from 'ember-env-macros';
configEnv('some.missingKey', 'defaultConfig')
buildEnv('anotherMissing', 'defaultBuild')`,
    {
      plugins: [
        [
          EnvPlugin,
          {
            configEnv: {
              some: {
                key: 'value',
              },
            },
            buildEnv: {
              another: {
                key: 'eulav',
              },
            },
          },
        ],
      ],
    }
  );
  expect(code).toMatchSnapshot();
});
