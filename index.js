require('dotenv').config();

const express=require('express')
const cors=require('cors')
const db=require('./Connection/db')
const router = require('./Router/routes')
const ecartserver=express();

ecartserver.use(cors())
ecartserver.use(express.json())

ecartserver.use(router)

const port=3000||process.env.PORT

ecartserver.listen(port,()=>{
    console.log("ecart server listening on port "+port);
})

ecartserver.get('/',(req,res)=>{
    console.log('ecart server started');
})