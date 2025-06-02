import express from 'express'
import {addReview , deleteReview , updateReview , getReview} from '../controllers/reviewController.js'
import { authenticateUser } from "../middlewares/authorisation.js"

const router = express.Router();

// to get all the reviews a person made
router.get('/',authenticateUser, getReview);

//adding a new review
router.post('/',authenticateUser, addReview);

// Editing/ Updating a review
router.post('/',authenticateUser, updateReview);

// Deleting a review
router.delete('/',authenticateUser, deleteReview);

export default router;
