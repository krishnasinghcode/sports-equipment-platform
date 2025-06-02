import Product from '../models/productModel.js';


// function for getting all the products form DB (products)
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
};

// function for getting all the products from admin's control (products that the admin has added to the site)
export const getAdminProducts = async (req, res) => {
    try {
        const adminId = req.user._id;
        const products = await Product.find({ seller: adminId });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching admin products",
            error: error.message,
        });
    }
};

// function for adding an product from admins's control by using (productId)
export const getOneProduct = async(req,res) =>{
    try {
        const product = await Product.findOne({ productId: req.params.id });
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product", error: error.message });
    }
}

// funtction for adding an product form admin's control by using (productModels.js)
export const addProducts = async (req, res) => {
    try {
        const {
            name,
            productId,
            description,
            images,
            category,
            rating,
            quantity,
            details,
            specifications,
            technicalInformation,
            priceOriginal,
            priceDiscounted,
            reviews,
            sizeOrType,
        } = req.body;

        if (!name || !productId || !quantity || !priceOriginal) {
            return res.status(400).json({ message: "Name, productId, quantity, and priceOriginal are required." });
        }

        const existingProduct = await Product.findOne({ productId });
        if (existingProduct) {
            return res.status(400).json({ message: "Product with this productId already exists." });
        }

        const newProduct = new Product({
            name,
            productId,
            description,
            images,
            category,
            rating,
            quantity,
            seller: req.user._id,
            sellerDetails: {
                name: req.user.name,
                contact: req.user.email,
            },
            details,
            specifications,
            technicalInformation,
            priceOriginal,
            priceDiscounted,
            reviews,
            sizeOrType,
        });

        const savedProduct = await newProduct.save();

        res.status(201).json({
            message: "Product added successfully",
            product: savedProduct,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// function for deleting an product from admin's control by using (productId)
export const deleteProducts = async (req, res) => {
    try {
        const { productId } = req.params;

        if (!productId) {
            return res.status(400).json({ message: "Product ID is required for deletion." });
        }

        const deletedProduct = await Product.findOneAndDelete({
            productId,
            seller: req.user._id, // Ensure admin can only delete their own product
        });

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found or unauthorized access." });
        }

        res.status(200).json({ message: "Product deleted successfully.", product: deletedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// function for updating product details from admin's control by using (productId)
export const updateProduct = async (req, res) => {
    const {
        productId,
        name,
        description,
        images,
        category,
        rating,
        quantity,
        details,
        specifications,
        technicalInformation,
        priceOriginal,
        priceDiscounted,
        reviews,
        sizeOrType,
    } = req.body;

    try {
        const product = await Product.findOne({ productId, seller: req.user._id });

        if (!product) {
            return res.status(404).json({ message: "Product not found or unauthorized access." });
        }

        if (name) product.name = name;
        if (description) product.description = description;
        if (images) product.images = images;
        if (category) product.category = category;
        if (rating) product.rating = rating;
        if (quantity) product.quantity = quantity;
        if (details) product.details = details;
        if (specifications) product.specifications = specifications;
        if (technicalInformation) product.technicalInformation = technicalInformation;
        if (priceOriginal) product.priceOriginal = priceOriginal;
        if (priceDiscounted) product.priceDiscounted = priceDiscounted;
        if (reviews) product.reviews = reviews;
        if (sizeOrType) product.sizeOrType = sizeOrType;

        const updatedProduct = await product.save();

        return res.status(200).json(updatedProduct);
    } catch (error) {
        return res.status(500).json({ message: "Error updating product", error: error.message });
    }
};

// Controller for getting all product categories
export const productsCatagories = async (req, res) => {
    try {
        const categories = await Product.distinct("category");
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Error fetching categories", error: error.message });
    }
};

// Controller for getting a single product by id (product id)
export const productsId = async (req, res) => {
    try {
        // Use req.params.id to match your productId field
        const product = await Product.findOne({ productId: req.params.id });
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product", error: error.message });
    }
};

// Controller for getting all product belonging to same catagory
export const productsOfCatagory = async (req, res) => {
    try {
        // Fetching products from the specified category
        const products = await Product.find({ category: req.params.category });
        
        // If no products found, send a response indicating so
        if (!products.length) {
            return res.status(404).json({ message: "No products found in this category" });
        }

        // Sending the list of products back to the client
        res.status(200).json(products);
    } catch (error) {
        // Handling any errors that occur during the process
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
