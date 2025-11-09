const express = require('express');
const router = express.Router();

const Expense = require('../models/Expense');
const auth = require('../middleware/authMiddleware');

// ➕ Add expense
router.post('/', auth, async (req, res) => {
  try {
    console.log("📩 Received expense data:", req.body);
    console.log("👤 Authenticated user object:", req.user);

    const { item, amount, category } = req.body;
    if (!item || !amount || !category) {
      return res.status(400).json({ message: 'Missing fields!' });
    }

    // ✅ Attach user ID from token
    const newExpense = new Expense({
      userId: req.user.id,
      item,
      amount,
      category,
      date: new Date(),
    });

    await newExpense.save();
    console.log("✅ Expense saved:", newExpense);
    res.json(newExpense);
  } catch (err) {
    console.error("❌ Error in POST /api/expenses:", err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// 📋 Get all expenses for logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(expenses);
  } catch (err) {
    console.error("❌ Error fetching expenses:", err);
    res.status(500).json({ message: 'Error fetching expenses' });
  }
});

// ❌ Delete expense
router.delete('/:id', auth, async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error("❌ Error deleting expense:", err);
    res.status(500).json({ message: 'Error deleting expense' });
  }
});

module.exports = router;
