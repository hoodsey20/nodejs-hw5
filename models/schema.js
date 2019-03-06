const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    access_token: { type: String , required: true },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: String,
    surName: String,
    middleName: String,
    permission: {
      chat: {
        C: { type: Boolean , required: true },
        D: { type: Boolean , required: true },
        R: { type: Boolean , required: true },
        U: { type: Boolean , required: true },
      },
      news: {
        C: { type: Boolean , required: true },
        D: { type: Boolean , required: true },
        R: { type: Boolean , required: true },
        U: { type: Boolean , required: true },
      },
      setting: {
        C: { type: Boolean , required: true },
        D: { type: Boolean , required: true },
        R: { type: Boolean , required: true },
        U: { type: Boolean , required: true },
      },
    }
  }
);

const Users = mongoose.model('user', userSchema);

module.exports = {
  Users
};
