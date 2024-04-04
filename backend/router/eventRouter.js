const controller=require('../controller/event')
eventRouter=require('express').Router();


eventRouter.post("/createEvent",controller.createEvent);
eventRouter.post("/getEvent",controller.getEvent);
eventRouter.post("/uploadFile",controller.uploadFile);
eventRouter.get("/getEventById/:id",controller.getEventById);


exports.eventRouter = eventRouter
