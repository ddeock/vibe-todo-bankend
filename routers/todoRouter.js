const express = require('express');
const Todo = require('../models/Todo');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const todo = new Todo({ title: req.body.title });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title },
      { new: true }
    );
    if (!todo) {
      return res.status(404).json({ error: '할일을 찾을 수 없습니다' });
    }
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: '할일을 찾을 수 없습니다' });
    }
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
