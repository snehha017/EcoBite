const Food = require('../models/Food');

// @desc    Create a new food listing
// @route   POST /api/food
// @access  Private (Must be logged in)
const createFoodListing = async (req, res) => {
  try {
    const { title, quantity, pickupLocation, expiryTime } = req.body;

    if (!title || !quantity || !pickupLocation || !expiryTime) {
      return res.status(400).json({ message: 'Please add all required fields' });
    }

    // req.user.id comes from your security guard (authMiddleware)
    const food = await Food.create({
      donor: req.user.id, 
      title,
      quantity,
      pickupLocation,
      expiryTime
    });

    res.status(201).json(food);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all available food listings
// @route   GET /api/food
// @access  Private 
const getFoodListings = async (req, res) => {
  try {
    // Find only available food. populate() pulls in the donor's name and email!
    const foods = await Food.find({ status: 'available' })
                            .populate('donor', 'name email address');
    
    res.status(200).json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Claim a food listing (NGO only)
// @route   PUT /api/food/:id/claim
// @access  Private 
const claimFoodListing = async (req, res) => {
  try {
    // Find the specific food post using the ID from the URL
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({ message: 'Food listing not found' });
    }

    // Ensure only NGOs can claim food
    if (req.user.role !== 'ngo') {
      return res.status(403).json({ message: 'Only NGOs can claim food' });
    }

    // Check if it's already taken
    if (food.status !== 'available') {
      return res.status(400).json({ message: 'This food has already been claimed' });
    }

    // Update the food status and attach the NGO's ID
    food.status = 'claimed';
    food.claimedBy = req.user.id;

    const updatedFood = await food.save();

    res.status(200).json(updatedFood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { createFoodListing, getFoodListings, claimFoodListing };