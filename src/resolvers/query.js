module.exports = {
  hello: () => 'Hello world!',
  books: async (parent, args, { models }, info) => {
    return await models.Book.find();
  },
  book: async (parent, args, { models }, info) => {
    return await models.Book.findById(args.id);
  },
  users: async (parent, args, { models }, info) => {
    return await models.User.find({});
  },
  user: async (parent, { username }, { models }, info) => {
    return await models.User.findOne({ username });
  },
};
