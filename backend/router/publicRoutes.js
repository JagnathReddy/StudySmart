publicRouter=require('express').Router();


publicRouter.use("/profile",(req,res)=>{
    res.send("public profile without friends");
})
publicRouter.use("",(req,res)=>{
    res.send("no show")
})

exports.publicRouter =publicRouter
