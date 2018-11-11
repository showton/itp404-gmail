import { module, test } from "qunit";
import {
  visit,
  currentURL,
  fillIn,
  click,
  pauseTest
} from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";
import setupMirage from "ember-cli-mirage/test-support/setup-mirage";

module("Acceptance | emails", function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  // hooks.afterEach(function() {
  //   console.log(window);
  //   reset();
  // });

  // test('visiting /emails', async function(assert) {
  //   await visit('/emails');
  //
  //   assert.equal(currentURL(), '/emails');
  // });

  test("testing starred/unstarred", async function(assert) {
    server.create("email", { starred: true });
    server.create("email", { starred: true });
    server.create("email", { starred: false });
    server.create("email", { starred: false });
    server.create("email", { starred: false });

    await visit("/");

    assert.dom('[data-test="star-email"]').exists({ count: 2 });
    assert.dom('[data-test="unstar-email"]').exists({ count: 3 });
  });

  test("viewing details of email", async function(assert) {
    server.create("email", {
      subject: "Dear Lord",
      from: "helpme@gmail.com",
      to: "jesus@gmail.com",
      message: "Pass this class."
    });

    await visit("/emails/1");

    assert.dom('[data-test="email-subject"]').hasText("Dear Lord");
    assert.dom('[data-test="email-from"]').hasText("helpme@gmail.com");
    assert.dom('[data-test="email-to"]').hasText("jesus@gmail.com");
    assert.dom('[data-test="email-message"]').hasText("Pass this class.");
  });

  test("testing trash", async function(assert) {
    server.create("email", { starred: false });
    server.create("email", { starred: false });
    window.confirm = () => true;

    await visit("/");
    assert.dom('[data-test="unstar-email"]').exists({ count: 2 });

    await visit("/emails/1");
    await click('[data-test="delete-email"]');
    await visit("/");
    assert.dom('[data-test="unstar-email"]').exists({ count: 1 });

    await visit("/emails/2");
    await click('[data-test="delete-email"]');
    await visit("/");
    assert.dom('[data-test="unstar-email"]').exists({ count: 0 });
  });

  test("testing compose email", async function(assert) {
    // assert.dom('[data-test="create-email"]').exists({ count: 0 });
    await visit("/");
    assert.dom('[data-test="unstar-email"]').exists({ count: 0 });
    await click("#composeEmailButton");

    // await visit("/emails/new");

    // this.set("#to", "jesus@gmail.com");
    await fillIn("#to", "jesus@gmail.com");
    // await pauseTest();
    await fillIn("#subject", "Save Me");
    await fillIn("#from", "andmysoul@gmail.com");
    await fillIn("#message", "From dying in this class.");
    await click('[data-test="publish-email"]');

    assert.equal(currentURL(), "/");
    assert.dom('[data-test="unstar-email"]').exists({ count: 1 });

    // Test the server database
    // http://www.ember-cli-mirage.com/docs/v0.2.x/acceptance-testing/
    // server.db.emails[0]

    // assert.dom('[data-test="email-to"]').hasText("jesus@gmail.com");
    // assert.dom('[data-test="email-subject"]').hasText("Save Me");
    // assert.dom('[data-test="email-from"]').hasText("andmysoul@gmail.com");
    // assert
    //   .dom('[data-test="email-message"]')
    //   .hasText("From dying in this class.");
    // assert.dom('[data-test="create-email"]').exists({ count: 1 });
  });
});
