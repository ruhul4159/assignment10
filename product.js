const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: String,
    price: Number,
    description: String,
    createdAt: { type: Date, default: Date.now }
  });

  const Product = mongoose.model('Product', productSchema);
  module.exports = Product;
