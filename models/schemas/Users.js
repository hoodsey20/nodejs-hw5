const crypto = require('crypto');
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

userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 512, 'sha512')
    .toString('hex');
};

userSchema.methods.validPassword = function(password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 512, 'sha512')
    .toString('hex');
  return hash === this.hash;
};

userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });



const Users = mongoose.model('user', userSchema);

module.exports = Users;
