import Review from '../models/reviewModel.js'
import Product from '../models/productModel.js'
import User from '../models/userModel.js'

// function for getting all the reviwes made by a user
export const getReview = async (req, res) => {
    const { reviewId } = req.params;

    try {
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: "Review Not Found!" });
        }

        return res.status(200).json(review);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


//function for adding a new review
export const addReview = async (req, res) => {
    const { userId, productId, reviewText, reviewRating } = req.body;

    try {
        const product = await Product.findOne({ productId });
        if (!product) {
            return res.status(404).json({ message: "Product Not Found!" });
        }

        if (!reviewText || !reviewRating) {
            return res.status(400).json({ message: "Review text and review rating are required!" });
        }

        // Fetch user's name from userId
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User Not Found!" });
        }

        const newReview = await Review.create({
            productId,
            userId,
            userName: user.name,  // Store user's name
            reviewText,
            rating: reviewRating
        });

        product.reviews.push(newReview._id);
        await product.save();

        return res.status(201).json({ message: "Review added successfully!", review: newReview });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


//function for Updating a review
export const updateReview = async (req, res) => {
    const { reviewId } = req.params;
    const { reviewText, reviewRating } = req.body;

    try {
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: "Review Not Found!" });
        }

        if (reviewText) review.reviewText = reviewText;
        if (reviewRating !== undefined) review.rating = reviewRating;

        await review.save();

        return res.status(200).json({ message: "Review updated successfully!", review });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


//function forDeleting a review
export const deleteReview = async (req, res) => {
    const { reviewId, productId } = req.params;

    try {
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: "Review Not Found!" });
        }

        await Review.findByIdAndDelete(reviewId);

        // Remove review ID from product's reviews array
        await Product.findOneAndUpdate(
            { _id: productId },
            { $pull: { reviews: reviewId } }
        );

        return res.status(200).json({ message: "Review deleted successfully!" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
