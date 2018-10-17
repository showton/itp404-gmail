import Route from "@ember/routing/route";

export default Route.extend({
  // refresh post each time you click on link
  setupController(controller, model) {
    //stop default behavior
    this._super(controller, model);
    //set controller title and body to empty string on refresh
    controller.set("subject", "");
    controller.set("message", "");
    controller.set("to", "");
    controller.set("from", "");
  }
});
