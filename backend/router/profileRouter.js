const controller=require('../controller/profile')
profileRouter=require('express').Router();


profileRouter.get("/getProfile",controller.getProfile)
profileRouter.get("/getFriend",controller.getFriend)
profileRouter.post("/addFriend",controller.addFriend)



exports.profileRouter =profileRouter
