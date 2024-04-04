const express=require('express')
const cors = require('cors');
const bodyParser = require("body-parser");
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json())
app.use(bodyParser.json({limit:"50mb"}))
const admin=require('./firebase/firebase')


app.use('/protected',require('./router/protectedRoutes.js').protectRouter);
app.use('/public',require('./router/publicRoutes.js').publicRouter)
app.listen(8000,()=>{
    console.log('listening on 8000')
});
