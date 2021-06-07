module.exports = {
  hello: () => 'Hello world!',
  books: async (parent, args, { models }, info) => {
    return await models.Book.find();
  },
  book: async (parent, args, { models }, info) => {
    return await models.Book.findById(args.id);
  },
};
