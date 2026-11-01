const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  // This links the food to the specific user who created it
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: {
    type: String,
    required: true, // e.g., "5 Loaves of Bread and 12 Muffins"
  },
  quantity: {
    type: String,
    required: true, // e.g., "Enough for 10 people" or "5 kg"
  },
  pickupLocation: {
    type: String,
    required: true, 
  },
  expiryTime: {
    type: Date,
    required: true, // When does this food go bad?
  },
  status: {
    type: String,
    enum: ['available', 'claimed', 'picked_up'],
    default: 'available',
  },
  // This will be filled later when an NGO clicks "Claim"
  claimedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model('Food', foodSchema);