import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Helper | truncate-text", function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test("it renders", async function(assert) {
    this.set("value", "25");
    this.set("sign", "...");

    await render(hbs`{{truncate-text value sign=sign data-test="characters"}}`);

    assert.equal(this.element.textContent.trim(), "25...");
  });

  test("truncated characters", async function(assert) {
    this.set("length", "25");
    await render(hbs`{{truncate-text length data-test="characters"}}`);

    assert.dom('[data-test="characters"]').length(25);
  });
});
