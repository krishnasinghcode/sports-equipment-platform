import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    productId: { type: String, required: true, unique: true },
    description: { type: String },
    images: [{ type: String }],
    category: [{ type: String }],
    rating: { type: Number, min: 0, max: 5 },
    quantity: { type: Number, required: true },

    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    sellerDetails: {
        name: { type: String },
        contact: { type: String },
    },
    details: { type: String },
    specifications: { type: String },
    technicalInformation: { type: String },
    priceOriginal: { type: Number, required: true },
    priceDiscounted: { type: Number },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    sizeOrType: [{ type: String }],
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
