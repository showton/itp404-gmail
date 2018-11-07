import { module, test } from "qunit";
import { visit, currentURL, fillIn, click } from "@ember/test-helpers";
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
    window.confirm = () => false;

    await visit("/emails/");
    await click('[data-test="delete-email"]');

    assert.dom('[data-test="delete-email"]').exists({ count: 0 });
  });

  test("testing compose email", async function(assert) {
    server.create("email");

    assert.dom('[data-test="create-email"]').exists({ count: 0 });

    await visit("/emails/new");

    await fillIn("#to", "jesus@gmail.com");
    await fillIn("#subject", "Save Me");
    await fillIn("#from", "mysoul@gmail.com");
    await fillIn("#message", "From dying in this class.");
    await click('[data-test="publish-email"]');

    assert.equal(currentURL(), "/emails/1");
    assert.dom('[data-test="email-to"]').hasText("jesus@gmail.com");
    assert.dom('[data-test="email-subject"]').hasText("Save Me");
    assert.dom('[data-test="email-from"]').hasText("mysoul@gmail.com");
    assert
      .dom('[data-test="email-message"]')
      .hasText("From dying in this class.");
    assert.dom('[data-test="create-email"]').exists({ count: 1 });
  });
});
