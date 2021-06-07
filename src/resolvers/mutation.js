module.exports = {
  addBook: async (parent, args, { models }, info) => {
    return await models.Book.create({
      title: args.title,
      author: args.author,
    });
  },
};
