const { AuthenticationError } = require('apollo-server-express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('../gravatar.js');

module.exports = {
  addBook: async (parent, args, { models, user }) => {
    if (!user) {
      throw new AuthenticationError('You must login to create a new book');
    }
    return await models.Book.create({
      title: args.title,
      author: mongoose.Types.ObjectId(user.id),
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
  signIn: async (parent, { username, email, password }, { models }, info) => {
    if (email) {
      email = email.trim().toLowerCase();
    }
    const user = await models.User.findOne({
      $or: [{ email }, { username }],
    });
    if (!user) {
      throw new AuthenticationError('Error signing in');
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new AuthenticationError('Error signing in');
    }
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  },
};
