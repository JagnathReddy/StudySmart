const controller=require('../controller/subject')
subjectRouter=require('express').Router();


subjectRouter.post("/addSubject",controller.addSubject)
subjectRouter.get("/getAllSubject",controller.getAllSubject)

exports.subjectRouter = subjectRouter
