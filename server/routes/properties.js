import express from 'express';
import Property from '../models/property.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get all properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find().sort({ postedDate: -1 });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single property
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new property 
router.post('/', async (req, res) => {
  const property = new Property({
    ...req.body,
    postedDate: new Date()
  });

  try {
    const newProperty = await property.save();
    res.status(201).json(newProperty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a property (protected)
router.put('/:id',  async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProperty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a property (protected)
router.delete('/:id',  async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: 'Property deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;