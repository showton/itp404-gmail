import Controller from "@ember/controller";

export default Controller.extend({
  actions: {
    deleteEmail(email) {
      let confirmed = window.confirm(
        "Are you sure you want to delete this email?"
      );
      if (confirmed) {
        console.log("destroy record test");
        email.destroyRecord().then(() => {
          console.log("test");
          this.transitionToRoute("index");
          console.log("test again");
        });
      }
    }
  }
});
