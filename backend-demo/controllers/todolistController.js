const Todo = require("../models/todolistModel");

const getAllTodos = async (req, res) => {
  try {
    const items = await Todo.find();
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getOneTodo = async (req, res) => {
  try {
    const item = await Todo.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createTodo = async (req, res) => {
  const { title, description, dueDate, created } = req.body;

  try {
    const item = new Todo({ title, description, dueDate, created });
    const savedItem = await item.save();
    res.status(200).json(savedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { title, description, dueDate, completed } = req.body;
    const item = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description, dueDate, completed },
      { new: true }
    );
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const item = await Todo.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllTodos,
  getOneTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
