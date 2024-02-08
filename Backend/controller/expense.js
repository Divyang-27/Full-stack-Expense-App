const { all } = require('axios');
const Expense = require('../model/expense');

exports.postExpense = async (req, res, next) => {
  const amount = req.body.amount;
  const description = req.body.description;
  const category = req.body.category;
  const expense = await Expense.create({
    amount: amount,
    category: category,
    description: description,
  });
  res.json({ newExpenseDetails: expense });
};

exports.getExpense = async (req, res, next) => {
  const allExpense = await Expense.findAll();
  res.json({ allExpenseDetails: allExpense });
};

exports.deleteExpense = async (req, res, next) => {
  const id = req.params.id;
  Expense.destroy({
    where: {
      id: id,
    },
  });
};
