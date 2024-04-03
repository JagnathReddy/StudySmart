const express=require('express')
require('dotenv').config();
const app = express();
app.use(express.json());
const admin=require('./firebase/firebase')


app.use('/protected',require('./router/protectedRoutes.js').protectRouter);
app.use('/public',require('./router/publicRoutes.js').publicRouter)
app.listen(8000,()=>{
    console.log('listening on 8000')
});
