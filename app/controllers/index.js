import Controller from "@ember/controller";
import RSVP from "rsvp";
import { later } from "@ember/runloop";

export default Controller.extend({
  starred: true,
  actions: {
    //Data Down, Actions Up (DDAU) -> one way data flow in react; any data passed to a component, component shouldn't motify it
    star(email, newValue) {
      email.set("starred", newValue);
      email.save();
    }
  }
});
