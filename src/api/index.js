const express=require('express')
const app=express();
const PORT=process.env.PORT || 5000;
const cors=require('cors')
const bodyParser=require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors());

require('dotenv').config()

const MongoClient = require('mongodb').MongoClient;

const uri = "ask for this";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true  });
let collection=null;

client.connect(err => {
    if(err){
        console.log('error connecting to db'+err)
    }
    console.log("Connected to db")
 collection = client.db("Shipbox").collection("orders");
  // perform actions on the collection object
 
});

app.post('/create-order',async(req,res)=>{
    var data={
        name:req.body.name,
        weight:req.body.weight,
        country:req.body.country,
        color:req.body.color,
        cost:req.body.cost
    }

    try{
        await collection.insertOne(data);
        res.send('OK').status(200);
        console.log("order created")
    }catch (err){
        res.send(err).status(500)
        console.log(err)
    }
})


app.get('/orders',async(req,res)=>{
    try{
       var data= await collection.find().toArray();
res.send(data).status(200)
    console.log(data)
    }catch (err){
        console.log(err);
        res.send(err).status(500);
    }
})


client.close();
app.listen(PORT,()=>{
    console.log(`listening to ${PORT}`)
})
