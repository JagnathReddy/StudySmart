protectRouter=require('express').Router();

protectRouter.use(require('../middleware/auth').auth);

protectRouter.use("/profile",require('./profileRouter').profileRouter);
protectRouter.use("/subject",require('./subjectRouter').subjectRouter);
protectRouter.use("/testScore",require('./testScoreRouter').testScoreRouter)
protectRouter.use("/attendance",require('./attendanceRouter').attendanceRouter)
protectRouter.use("/expense",require('./expenseRouter').expenseRouter)
// protectRouter.use("/remainder")
// protectRouter.use("/studySession")


exports.protectRouter =protectRouter
