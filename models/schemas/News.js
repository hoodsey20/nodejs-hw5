const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

module.exports = News;
