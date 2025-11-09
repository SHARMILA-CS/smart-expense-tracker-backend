// backend/controllers/expenseController.js
const Expense = require('../models/Expense');

// GET /api/expenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// POST /api/expenses
exports.addExpense = async (req, res) => {
  try {
    const { item, amount, category, date } = req.body;
    const expense = new Expense({
      user: req.user,
      item,
      amount,
      category: category || 'Other',
      date: date || new Date()
    });
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// PUT /api/expenses/:id  (optional if you want update)
exports.updateExpense = async (req, res) => {
  try {
    const { item, amount, category, date } = req.body;
    const exp = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      { item, amount, category, date },
      { new: true }
    );
    if (!exp) return res.status(404).json({ msg: 'Expense not found' });
    res.json(exp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// DELETE /api/expenses/:id
exports.deleteExpense = async (req, res) => {
  try {
    const exp = await Expense.findOneAndDelete({ _id: req.params.id, user: req.user });
    if (!exp) return res.status(404).json({ msg: 'Expense not found' });
    res.json({ msg: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
