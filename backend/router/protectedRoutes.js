protectRouter=require('express').Router();

protectRouter.use(require('../middleware/auth').auth);

protectRouter.use("/profile",require('./profileRouter').profileRouter);
protectRouter.use("/subject",require('./subjectRouter').subjectRouter);
// protectRouter.use("/expense")
// protectRouter.use("/attendence")
// protectRouter.use("/remainder")
// protectRouter.use("/studySession")


exports.protectRouter =protectRouter
