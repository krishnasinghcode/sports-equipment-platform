import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },

    // Address is an array of address objects
    address: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address',
        }
    ],

    // Reference to orders placed by the user
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
        },
    ],

    // Auth provider: 'local' or 'google'
    provider: {
        type: String,
        default: 'local'
    },

    // Google OAuth data
    googleId: {
        type: String,
        default: null
    },
    googleAccessToken: {
        type: String,
        default: null
    },
    googleRefreshToken: {
        type: String,
        default: null
    },

    // OTP verification fields
    verifyOtp: {
        type: String,
        default: ''
    },
    verifyOtpExpireAt: {
        type: Date,
        default: Date.now
    },
    isAccountVerified: {
        type: Boolean,
        default: false
    },

    // Password reset fields
    resetOtp: {
        type: String,
        default: ''
    },
    resetOtpExpireAt: {
        type: Date,
        default: Date.now
    },
    isResetVerified: {
        type: Boolean,
        default: false
    },

    // Optional avatar image URL
    avatar: {
        type: String,
        default: null
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
