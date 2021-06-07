export const resolvers = {
  Query: {
    firewalls: (_, __, { dataSources: { firewalls } }) => firewalls.getFirewalls(),
    firewall: (_, { id }, { dataSources: { firewalls } }) => firewalls.getFirewall(),
  },
};
