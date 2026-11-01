const express = require('express');
const router = express.Router();
const { createFoodListing, getFoodListings, claimFoodListing } = require('../controllers/foodController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getFoodListings)
  .post(protect, createFoodListing);

// ⬇️ ADD THIS NEW ROUTE ⬇️
// The :id is a dynamic variable. It will match the specific _id of the food listing.
router.route('/:id/claim').put(protect, claimFoodListing);
// ⬆️ -------------------- ⬆️

module.exports = router;