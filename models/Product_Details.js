const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  pro_categories: {
    type: [String],
    required: true
  },
  pro_name: {
    type: String,
    required: true
  },
  pro_reviews: {
    type: Number,
    default: 0
  },
  pro_price: {
    type: Number,
    required: true
  },
  pro_description: {
    type: String,
    required: true
  },
  pro_availability: {
    type: Number,
    default: true
  },
  size: {
    type: String
  },
  quantity: {
    type: Number,
    default: 0
  },
  wishlist: {
    type: Number,
    default: 0
  },
  addToCart: {
    type: Number,
    default: 0
  },
  categories: {
    type: [String]
  },
  tags: {
    type: [String]
  },
  SKU: {
    type: String,
    unique: true,
    required: true
  },
  imageurl: {
    type: String,
}

});

module.exports  = mongoose.model('Products_detail', productSchema);
