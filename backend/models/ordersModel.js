// models/Order.js

import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    orderStatus: {
        type: String,
        enum: [
            'Pending',
            'Processing',
            'Shipped',
            'Delivered',
            'Cancelled',
            'Returned',
            'Replaced'
        ],
        default: 'Pending',
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed'],
        default: 'Pending',
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paymentId: {
        type: String,
        required: true
    }
}, {
    timestamps: true // adds createdAt and updatedAt
});

export default mongoose.model('Order', orderSchema);
