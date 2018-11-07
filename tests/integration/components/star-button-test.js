import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | star-button", function(hooks) {
  setupRenderingTest(hooks);

  test("star filled", async function(assert) {
    this.set("starFilled", true);

    await render(hbs`
      <StarButton @starred={{starFilled}}/>
    `);

    assert.dom("img").hasAttribute("src", "/img/starred.png");
  });

  test("star not filled", async function(assert) {
    this.set("starFilled", false);

    await render(hbs`
      <StarButton @starred={{starFilled}}/>
    `);

    assert.dom("img").hasAttribute("src", "/img/unstarred.png");
  });
});
