const express = require('express');
const Problem = require('../models/Problem');
const router = express.Router();

// Upload problems
router.post('/upload', async (req, res) => {
  try {
    const { problems } = req.body;
    const savedProblems = await Problem.insertMany(problems);
    res.status(201).json({ message: 'Problems added successfully', savedProblems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all problems
router.get('/', async (req, res) => {
  try {
    const problems = await Problem.find();
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get problem by ID
router.get('/:id', async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ message: 'Problem not found' });
    res.status(200).json(problem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update problem by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedProblem = await Problem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProblem) return res.status(404).json({ message: 'Problem not found' });
    res.status(200).json(updatedProblem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete problem by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedProblem = await Problem.findByIdAndDelete(req.params.id);
    if (!deletedProblem) return res.status(404).json({ message: 'Problem not found' });
    res.status(200).json({ message: 'Problem deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

