import EmberRouter from "@ember/routing/router";
import config from "./config/environment";

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route("email", { path: "/emails/:id" });
  this.route("sent");
  this.route("trash");
  this.route("create", { path: "/emails/new" });
});

export default Router;
