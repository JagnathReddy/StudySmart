const controller=require('../controller/testScore')
testScoreRouter=require('express').Router();


testScoreRouter.post("/addScore",controller.addScore)

exports.testScoreRouter = testScoreRouter
