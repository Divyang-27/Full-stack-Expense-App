const express = require('express');
const expense = require('../controller/expense');

const router = express.Router();

router.post('/', expense.postExpense);
router.get('/', expense.getExpense);
router.delete('/:id', expense.deleteExpense);
module.exports = router;
