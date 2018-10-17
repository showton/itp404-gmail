import Controller from "@ember/controller";

export default Controller.extend({
  actions: {
    composeEmail(event) {
      event.preventDefault();
      // read out inputs
      console.log(this.subject, this.message);

      //save a post model
      let email = this.store.createRecord("email", {
        to: this.to,
        from: this.from,
        subject: this.subject,
        message: this.message
      });
      //save post and redirect back to index
      email.save().then(() => {
        this.transitionToRoute("index");
      });
    }
  }
});
