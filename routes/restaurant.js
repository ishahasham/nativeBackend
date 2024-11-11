const express = require('express');
const Restaurant = require('../models/Restaurant');

const router = express.Router();

// Create restaurant api
router.post('/', async (req, res) => {
  const { name, location, cuisine, rating, priceRange } = req.body;

  try {
    const newRestaurant = new Restaurant({ name, location, cuisine, rating, priceRange });
    await newRestaurant.save();
    res.status(201).json({ message: 'Restaurant created successfully', restaurant: newRestaurant });
  } catch (error) {
    res.status(500).json({ message: 'Error creating restaurant', error });
  }
});

// Get all restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching restaurants', error });
  }
});

// Get a specific restaurant by ID
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching restaurant', error });
  }
});

// Update a restaurant by ID
router.put('/:id', async (req, res) => {
  const { name, location, cuisine, rating, priceRange } = req.body;

  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      { name, location, cuisine, rating, priceRange },
      { new: true }
    );
    if (!updatedRestaurant) return res.status(404).json({ message: 'Restaurant not found' });
    res.status(200).json({ message: 'Restaurant updated successfully', restaurant: updatedRestaurant });
  } catch (error) {
    res.status(500).json({ message: 'Error updating restaurant', error });
  }
});

// Delete a restaurant by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!deletedRestaurant) return res.status(404).json({ message: 'Restaurant not found' });
    res.status(200).json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting restaurant', error });
  }
});

module.exports = router;
