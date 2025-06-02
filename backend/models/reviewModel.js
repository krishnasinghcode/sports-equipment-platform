import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    productId: { type: String, required: true },  // Storing custom product ID
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },  // Store the user's name
    reviewText: { type: String, required: true },
    rating: { type: Number, min: 0, max: 5, required: true },
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);
export default Review;
