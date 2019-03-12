const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    access_token: { type: String , required: true },
    hash: { type: String , required: true },
    salt: { type: String , required: true },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    image: String,
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
userSchema.virtual('id').get(function(){
  return this._id.toHexString();
});
userSchema.virtual('permissionId').get(function(){
  return this._id.toHexString();
});
userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.hash;
  delete obj.salt;
  delete obj._id;
  delete obj.__v;
  obj.access_token = '1';
  return obj;
};
userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

const Users = mongoose.model('user', userSchema);

const newsSchema = new Schema(
  {
    date: { type: String , required: true },
    text: { type: String , required: true },
    user: { type: String , required: true },
    theme: { type: String , required: true },
  }
);
newsSchema.virtual('id').get(function(){
  return this._id.toHexString();
});
newsSchema.set('toJSON', { virtuals: true });
newsSchema.set('toObject', { virtuals: true });
newsSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj._id;
  delete obj.__v;
  return obj;
};
const News = mongoose.model('new', newsSchema);

module.exports = {
  Users,
  News,
};
