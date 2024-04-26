const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  pro_categories: {
    type: String,
    required: true
  },
  pro_name: {
    type: String,
    required: true
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
    type: String,
    enum: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  quantity: {
    type: Number,
    default: 0
  },

  tags: {
    type: [String]
  },

  imageurl: {
    type: String,
  }

});

module.exports = mongoose.model('product', productSchema);
