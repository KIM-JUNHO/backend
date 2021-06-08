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
  me: async (parent, args, { models, user }) => {
    return await models.User.findById(user.id);
  },
  bookFeed: async (parent, { cursor }, { models }, info) => {
    const limit = 5;
    let hasNextPage = false;
    let cursorQuery = {};
    if (cursor) {
      cursorQuery = { _id: { $lt: cursor } };
    }
    let books = await models.Book.find(cursorQuery)
      .sort({ _id: -1 })
      .limit(limit + 1);
    if (books.length > limit) {
      hasNextPage = true;
      books = books.slice(0, -1);
    }
    const newCursor = books[books.length - 1]._id;
    return {
      books,
      cursor: newCursor,
      hasNextPage,
    };
  },
};
