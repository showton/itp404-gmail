import Component from "@ember/component";

export default Component.extend({
  tagName: "li",
  model() {
    return this.store.findAll("email");
  }
});
