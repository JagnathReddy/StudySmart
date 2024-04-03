const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const { STATUS_CODES } = require('http');

const db = getFirestore();


exports.newExpense = async (req, res) => {
    const expenseRef = db.collection('expense').doc()
    expenseRef.set(req.body.expense);
    const profileRef= db.collection('profile').doc(req.user.email);
    const expense={}
    req.body.expense.date=new Date().toDateString();
    req.body.expense.user=req.user.email;
    expense[req.body.expense.name]=expenseRef.id;
    profileRef.set({expense},{merge:true});
    res.send(expenseRef.id);
}

exports.addExpense = async (req, res)=>{
    const expenseRef=db.collection('expense').doc(req.body.id)
    let expenseData=await expenseRef.get()
    if(!expenseData.exists){
        res.status(404).send("check expense id");
        return
    }
    expenseData=expenseData.data()
    if(expenseData.user!==req.user.email){
        res.status(401).end();
        return;
    }
    let newExpense={"contents":{}}
    newExpense["contents"][req.body.expense.name] = req.body.expense
    expenseRef.set(newExpense,{merge:true})
    res.send(expenseRef.id)
}

exports.shareExpense= async(req,res)=>{
    const expenseRef=db.collection('expense').doc(req.body.id)
    let expenseData=await expenseRef.get()
    if(!expenseData.exists){
        res.status(404).send("check expense id");
        return
    }
    expenseData=expenseData.data()
    console.log(expenseData)
    console.log(expenseData.user+"---"+req.user.email)
    if(expenseData.user!==req.user.email){
        res.status(401).end();
        return;
    }
    expenseRef.set({"public":true,"link":`localhost:8000/public/getExpense/${expenseRef.id}`},{merge:true})
    res.redirect(`/public/getExpense/${expenseRef.id}`);
}


exports.getExpense=async(req,res)=>{
    const expenseRef=db.collection('expense').doc(req.params.id)
    
    let expenseData=(await expenseRef.get())
    if(!expenseData.exists){
        res.status(404).send("check expense id");
        return
    }
    expenseData=expenseData.data()
    if(expenseData.user!==req.user.email){
        res.status(401).end();
        return;
    }
    res.send(expenseData);
}
