publicRouter=require('express').Router();
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const { STATUS_CODES } = require('http');

const db = getFirestore();

publicRouter.use("/getExpense/:id",async(req,res)=>{
    const expenseRef=db.collection('expense').doc(req.params.id)
    
    let expenseData=(await expenseRef.get())
    if(!expenseData.exists){
        res.status(404).send("check expense id");
        return
    }
    expenseData=expenseData.data()
    
    console.log(expenseData)
    if(!Boolean(expenseData.public)){
        res.status(401).send("Unauthorized access")
        return
    }
    res.send(expenseData);
})

exports.publicRouter =publicRouter
