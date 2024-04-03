const express=require('express')
require('dotenv').config();
const app = express();
app.use(express.json());
const admin=require('./firebase/firebase')

app.use("/private",require('./middleware/auth.js').auth);
app.use((req,res)=>{
    res.send(req.user)
})
app.listen(8000,()=>{
    console.log('listening on 8000')
});
