const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dogFoodSchema = new Schema({
  title: { type: Schema.Types.String, required: true },
  brand: { type: Schema.Types.String, required: true },
  imageUrl: { type: Schema.Types.String, required: true },
  foodType: { type: Schema.Types.String, required: true },
  dogAge: { type: Schema.Types.String, required: true },
  description: { type: Schema.Types.String, required: true },
  size: { type: Schema.Types.Number, required: true },
  price: { type: Schema.Types.Number, required: true }
});

module.exports = mongoose.model('DogFood', dogFoodSchema);