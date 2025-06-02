// mergedProductRoutes.js

import express from "express";
import { authenticateUser,authenticateAdmin } from "../middlewares/authorisation.js";

import {
  getProducts,
  getAdminProducts,
  productsOfCatagory,
  productsCatagories,
  productsId,
  getOneProduct,
  addProducts,
  updateProduct,
  deleteProducts,
} from "../controllers/productController.js";


const router = express.Router();

//////////////////////
// 🟢 Public User Routes
//////////////////////

router.get("/", getProducts);                        // All products (public)
router.get("/catagories", productsCatagories);         // Product categories
router.get("/category/:category", productsOfCatagory); // Products by category
router.get("/:id", productsId);                         // Product by ID (user)

//////////////////////
// 🔒 Admin Routes (authenticated)
//////////////////////

router.get("/admin", authenticateAdmin, getAdminProducts);            // All products (admin)
router.get("/admin/:id", authenticateAdmin, getOneProduct);           // One product (admin)
router.post("/admin/add", authenticateAdmin, addProducts);            // Add product
router.put("/admin/:id", authenticateAdmin, updateProduct);           // Update product
router.delete("/admin/:productId", authenticateAdmin, deleteProducts); // Delete product

export default router;
