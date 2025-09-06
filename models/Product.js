import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  rentalPrice: {
    type: Number,
    required: true
  },
  forSale: {
    type: Boolean,
    default: false
  },
  sellingPrice: {
    type: Number
  },
  productLink: {
    type: String
  },
  images: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['pending', 'approved', 'needs_improvement', 'rejected'],
    default: 'pending'
  },
  adminFeedback: {
    type: String
  },
  lenderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);