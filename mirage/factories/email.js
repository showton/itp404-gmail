import { Factory, faker } from "ember-cli-mirage";

export default Factory.extend({
  id(i) {
    return i + 1;
  },
  from(i) {
    return faker.internet.exampleEmail();
  },
  message() {
    return faker.lorem.paragraphs();
  },
  email() {
    return faker.internet.email();
  },
  subject() {
    return faker.lorem.sentence();
  },
  to() {
    return faker.internet.userName();
  },
  starred() {
    return false;
  }
});
