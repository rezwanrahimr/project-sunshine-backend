const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config();

// midle ware

app.use(cors());
app.use(express.json());


// MONGODB

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://project-sunshineTwo:F08nDbXrHCLbxUJX@cluster0.buxdo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

function run(){
    try{
        client.connect();
        const serviceCollaction = client.db('services').collection('service');
        
        app.get('/services',async(req,res)=>{
            const quary = {};
            const service = serviceCollaction.find(quary);
            const result = await service.toArray();
            res.send(result);
        })

    }
    finally{

    }
}


run();
app.get('/',(req,res)=>{
    res.send('Running....')
})

app.listen(port,()=>{
    console.log(`server is running...${port}`)
})