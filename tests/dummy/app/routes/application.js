import Route from '@ember/routing/route';
import { configEnv, buildEnv } from 'ember-env-macros';

export default Route.extend({
  model() {
    return {
      config: {
        envValue: configEnv('ember-env-macros.envKey'),
        nestedValue: configEnv('ember-env-macros.nestedKey.key'),
        defaultValue: configEnv('ember-env-macros.missingKey', 'default')
      },
      build: {
        buildValue: buildEnv('ember-env-macros.buildKey'),
        nestedValue: buildEnv('ember-env-macros.nestedKey.key'),
        defaultValue: buildEnv('ember-env-macros.missingKey', 'default')
      }
    }
  }
});
