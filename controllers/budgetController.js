const Budget = require('../models/Budget');

// ✅ Get Budget
exports.getBudget = async (req, res) => {
  try {
    const userId = req.user.id || req.user; // handles both cases
    let budget = await Budget.findOne({ user: userId });

    if (!budget) {
      budget = await Budget.create({ user: userId, amount: 0 });
    }

    res.json(budget);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// ✅ Set / Update Budget
exports.setBudget = async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user.id || req.user;

    if (!amount || amount <= 0)
      return res.status(400).json({ msg: 'Invalid amount' });

    let budget = await Budget.findOne({ user: userId });

    if (budget) {
      budget.amount = amount;
      await budget.save();
    } else {
      budget = await Budget.create({ user: userId, amount });
    }

    res.json({ msg: 'Budget updated successfully', amount: budget.amount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
