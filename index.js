const express = require('express');
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors())
app.use(express.json());

// user = kurenai_admin
// password = UyFzlo6oSN0iANig

app.get("/",(req,res)=>{
    res.send("Server is runnig")
})




const uri = "mongodb+srv://kurenai_admin:UyFzlo6oSN0iANig@cluster0.pkgzac3.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
       const Blogs = client.db("kurenai").collection("blogs")

       // api for insert blog
       app.post("/blog",async(req,res)=>{
        const blog = req.body
        const date = new Date()
        const result = await Blogs.insertOne({...blog,date:date})
        res.send(result)
       })

       // api for get blogs data
       app.get("/blogs",async(req,res)=>{
        const query ={}
        const result = await Blogs.find(query).toArray()
        res.send(result)
       })
    }
    finally{

    }
}
run().catch(console.dir)






app.listen(port,()=>{
    console.log("server is running on",port);
})