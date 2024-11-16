const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  StockCode: { type: String, required: true, unique: true },
  Name: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Check if the first letter is uppercase
        return /^[A-Z]/.test(value);
      },
      message: 'Name must start with an uppercase letter'
    }
  },
  Description: { type: Object, default: {} },
  Images: { type: [String], default: [] },
  Price: { type: Number, required: true },
  DiscountedPrice: { type: Number, required: true },
  Quantity: { type: Number, required: true },
  Color: { type: String, default: 'Unknown' },
  Series: { type: String, default: 'Unknown' },
  Season: { type: String, default: 'Unknown' },
  isDiscounted: { type: Boolean, default: false },
  Active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
},  { collection: 'PRODUCTS' });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
