export const resolvers = {
  Query: {
    firewalls(_parent, _args, _context, _info) {
      return _context.db
        .collection('wbrt_firewalls')
        .findOne()
        .then((data) => {
          return data;
        });
    },
  },
};
