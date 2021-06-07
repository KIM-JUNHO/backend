import { MongoDataSource } from 'apollo-datasource-mongodb';

export default class Firewalls extends MongoDataSource {
  getFirewalls() {
    return this.findByFields({});
  }
  getFirewall(id) {
    return this.findOneById(id);
  }
}
