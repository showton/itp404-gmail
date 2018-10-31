import Component from "@ember/component";

export default Component.extend({
  model() {
    return this.store.findAll("email");
  }
});
