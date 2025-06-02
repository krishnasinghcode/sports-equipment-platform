import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';
import mongoose from 'mongoose';
// ADD TO CART
export const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        // Find or create cart
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, products: [], totalCost: 0 });
        }

        // Check if product is in cart
        const productIndex = cart.products.findIndex(item => item.productId.toString() === productId);

        if (productIndex !== -1) {
            // Increase quantity
            cart.products[productIndex].quantity += quantity;
        } else {
            // Add new product
            cart.products.push({ productId, quantity });
        }

        // Fetch all product details in a single query
        const productIds = cart.products.map(item => item.productId);
        const products = await Product.find({ _id: { $in: productIds } });

        // Map productId to price for fast lookup
        const productPriceMap = new Map(products.map(p => [p._id.toString(), p.priceDiscounted || p.priceOriginal]));

        // Calculate total cost
        cart.totalCost = cart.products.reduce((total, item) => {
            return total + (item.quantity * (productPriceMap.get(item.productId.toString()) || 0));
        }, 0);

        // Save cart
        await cart.save();
        res.status(200).json({ message: "Cart updated", cart });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// GET CART
export const getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ userId }).populate('products.productId');
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// REDUCE QUANTITY 
export const reduceQuantity = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        // Validate ObjectIds
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid userId or productId" });
        }

        if (!userId || !productId || !quantity) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const productIndex = cart.products.findIndex(item => item.productId.equals(productId));

        if (productIndex === -1) return res.status(404).json({ message: "Product not found in cart" });

        // Reduce quantity
        cart.products[productIndex].quantity -= quantity;

        // If quantity is 0 or less, remove product
        if (cart.products[productIndex].quantity <= 0) {
            cart.products.splice(productIndex, 1);
        }

        // Fetch product prices in one query
        const productIds = cart.products.map(item => item.productId);
        const products = await Product.find({ _id: { $in: productIds } });

        const productPriceMap = new Map(products.map(p => [p._id.toString(), p.priceDiscounted || p.priceOriginal]));

        // Recalculate total cost
        cart.totalCost = cart.products.reduce((total, item) => {
            return total + (item.quantity * (productPriceMap.get(item.productId.toString()) || 0));
        }, 0);

        await cart.save();
        res.status(200).json({ message: "Product quantity reduced", cart });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// REMOVE FROM CART
export const removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        let cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        // Remove product
        cart.products = cart.products.filter(item => item.productId.toString() !== productId);

        // Fetch product prices in one query
        const productIds = cart.products.map(item => item.productId);
        const products = await Product.find({ _id: { $in: productIds } });

        const productPriceMap = new Map(products.map(p => [p._id.toString(), p.priceDiscounted || p.priceOriginal]));

        // Recalculate total cost
        cart.totalCost = cart.products.reduce((total, item) => {
            return total + (item.quantity * (productPriceMap.get(item.productId.toString()) || 0));
        }, 0);

        await cart.save();
        res.status(200).json({ message: "Product removed", cart });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
