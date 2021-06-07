module.exports = {
  hello: () => 'Hello world!',
  books: async (parent, args, { models }, info) => {
    return await models.Book.find();
  },
};
