const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MovieSchema = new Schema(
  {
    title: {type: String, required: true},
    description: {type: String, required: true},
    cost: {type: Number, required: true},
    stock: {type: Number, required: true},
    //genres: {}
  }
);

// Virtual for movie's URL
MovieSchema
.virtual('url')
.get(function() {
  return '/movie/' + this._id;
});
module.exports = mongoose.model('Movie', MovieSchema);