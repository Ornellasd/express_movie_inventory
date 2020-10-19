const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MovieSchema = new Schema(
  {
    title: {type: String, required: true},
    description: {type: String, required: true},
    cost: {type: Number, required: true},
    stock: {type: Number, required: true},
    genre: {type: Schema.Types.ObjectId, ref: 'Genre'},
    image: {type: String}
  }
);

// Virtual for movie's URL
MovieSchema
.virtual('url')
.get(function() {
  return '/movie/' + this._id;
});

// Virtual for formatted movie price
MovieSchema
.virtual('cost_formatted')
.get(function() {
  return '$' + (this.cost.toFixed(2));
});

module.exports = mongoose.model('Movie', MovieSchema);