// models/Address.js

import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  line1: {
    type: String,
    required: true
  },
  line2: {
    type: String // optional
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  }
}, {
  timestamps: true // adds createdAt and updatedAt
});

export default mongoose.model('Address', addressSchema);
