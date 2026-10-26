const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['donor', 'ngo'],
    required: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false, // NGOs will need to be verified later by Person 4
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('User', userSchema);