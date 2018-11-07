import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | truncate text', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /truncate-text', async function(assert) {
    await visit('/truncate-text');

    assert.equal(currentURL(), '/truncate-text');
  });
});
