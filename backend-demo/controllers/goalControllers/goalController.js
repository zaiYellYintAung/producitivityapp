const Goal = require("../../models/goalModels/goalsModel");

// Controller methods for goals
const getAllGoals = async (req, res) => {
  try {
    const items = await Goal.find();
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getGoalById = async (req, res) => {
  try {
    const item = await Goal.findById(req.params.id);
    if (!item) {
      res.status(404).json({ message: "Not found" }); // Fix: Corrected 'staus' to 'status'
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createGoal = async (req, res) => {
  const { title, note, deadline, isCompleted, risks } = req.body;

  try {
    const item = new Goal({ title, note, deadline, isCompleted, risks });
    await item.save(); // Fix: Added 'await' to ensure the item is saved before responding
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateGoal = async (req, res) => {
  const { title, note, deadline, isCompleted, risks } = req.body;

  try {
    const item = await Goal.findByIdAndUpdate(
      req.params.id,
      {
        title,
        note,
        deadline,
        isCompleted,
        risks,
      },
      { new: true }
    );
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteGoal = async (req, res) => {
  try {
    const foundItem = await Goal.findById(req.params.id);
    if (!foundItem) {
      return res.status(404).json({ message: "Not found" });
    }
    if (req.user != foundItem.creator) {
      res
        .staus(400)
        .json({ message: "You don't have any permissions for this" });
    }
    const item = await Goal.findByIdAndDelete(req.params.id); // Fix: Declare 'item' using 'const'
    if (!item) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllGoals,
  getGoalById,
  createGoal,
  updateGoal,
  deleteGoal,
};
