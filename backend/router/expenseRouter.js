const controller=require('../controller/expense')
expenseRouter=require('express').Router();


expenseRouter.post("/newExpense",controller.newExpense);
expenseRouter.post("/addExpense",controller.addExpense);
expenseRouter.post("/shareExpense",controller.shareExpense);
exports.expenseRouter = expenseRouter
