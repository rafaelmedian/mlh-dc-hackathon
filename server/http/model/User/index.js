const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;
const validation = require('./validation');
const uniqueValidator = require('mongoose-unique-validator');
const types = require('../types');

// TODO: [] Update schemas so that the validators do not use `this`
const UserSchema = Schema({
  username: {
    type: String,
    validate: validation.username,
    unique: true,
    sparse: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Field is required'],
    validate: validation.email,
    unique: true,
    index: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Field is required'],
    validate: validation.password,
    trim: true,
  },
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  birthday: {
    type: Date,
  },
  phone: {
    type: String,
    validate: validation.phone,
    trim: true,
  },
  zipCode: {
    type: String,
    validate: validation.zipCode,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  state: {
    type: String,
    validate: validation.state,
    trim: true,
  },
  country: {
    type: String,
    validate: validation.country,
    trim: true,
  },
  token: {
    type: String,
  }
}, { timestamps: true });

UserSchema.plugin(uniqueValidator, { message: '{VALUE} is already taken.' });

// Virtual properties
UserSchema
  .virtual('age')
  .get(function () {
    const now = new Date();
    return now.getFullYear() - this.birthday.getFullYear();
  });

// Model methods
UserSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

const User = mongoose.model(types.user, UserSchema);

module.exports = User;
