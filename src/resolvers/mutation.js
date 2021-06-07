const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('../gravatar.js');

module.exports = {
  addBook: async (parent, args, { models }, info) => {
    return await models.Book.create({
      title: args.title,
      author: args.author,
    });
  },
  updateBook: async (parent, { id, title, author }, { models }, info) => {
    return await models.Book.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          title,
          author,
        },
      },
      {
        new: true,
      }
    );
  },
  deleteBook: async (parent, { id }, { models }, info) => {
    try {
      await models.Book.findOneAndRemove({ _id: id });
      return true;
    } catch (err) {
      return false;
    }
  },
  signUp: async (parent, { username, email, password }, { models }, info) => {
    email = email.trim().toLowerCase();
    const hashed = await bcrypt.hash(password, 10);
    const avatar = gravatar(email);
    try {
      const user = await models.User.create({
        username,
        email,
        avatar,
        password: hashed,
      });
      return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    } catch (err) {
      console.log(err);
      throw new Error('Error creating account');
    }
  },
};
