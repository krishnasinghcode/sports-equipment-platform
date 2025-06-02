import express from 'express';
import {authenticateUser} from '../middlewares/authorisation.js';
import { addToCart, getCart, removeFromCart , reduceQuantity } from '../controllers/cartController.js';

const router = express.Router();

router.post('/add',authenticateUser, addToCart);
router.get('/:userId',authenticateUser, getCart);
router.post('/reduce',authenticateUser, reduceQuantity);
router.post('/remove',authenticateUser, removeFromCart);

export default router;
