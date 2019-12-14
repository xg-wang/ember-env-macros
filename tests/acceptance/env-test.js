import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | application', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function(assert) {
    await visit('/');

    assert.equal(
      document.querySelector('#dev').textContent,
      'true',
      'config ENV in development mode only'
    );
    assert.equal(
      document.querySelector('#config').textContent,
      'false',
      'config in all environment'
    );
    assert.equal(
      document.querySelector('#config-nested').textContent,
      'config-nested'
    );
    assert.equal(
      document.querySelector('#config-default').textContent,
      'default'
    );

    assert.equal(document.querySelector('#build').textContent, 'true');
    assert.equal(document.querySelector('#build-nested').textContent, 'build');
    assert.equal(
      document.querySelector('#build-default').textContent,
      'default'
    );
  });
});
