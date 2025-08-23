// models/Product.js
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rentalPrice: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['fashion', 'home', 'events'],
  },
  productType: {
    type: String,
    required: true,
  },
  images: [{
    type: String,
  }],
  location: {
    type: String,
    required: true,
  },
  availability: {
    startDate: Date,
    endDate: Date,
  },
  lender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'rented'],
    default: 'active',
  },
}, {
  timestamps: true,
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);