// const express = require('express');
// const router = new express.Router();
// const mongoose = require('mongoose');

// // const Task = require('../models/task')
// const taskDb = require("../db/conn")

// const taskSchema = require("../models/task");

// router.post('/tasks',async(req,res)=>{
//     const {date, task,clcName,isDone,desc,tags,links,assignedTo,group,owner,isPublic}= req.body;
// const Task = taskDb.model(clcName,taskSchema);

  
//     try{
//         const user= new Task({date,task,isDone,desc,tags,links,assignedTo,group,owner,isPublic});
//         const result = await user.save();
//         console.log(result);
//         res.status(200).json({message:"Added successfully"});
//     }catch(e){
//         res.status(400).send(e);
//     }
// })


// router.get("/getTask/:id",async(req,res)=>{
// //    console.log(req.body)
// //    const {clcName,idd}= req.body;
// const clcName  = req.params.id;
// // console.log(clcName);
// // const Task = new mongoose.model(clcName,taskSchema);
// const Task = taskDb.model(clcName,taskSchema);

//     // let collection = await db.collection(req.params.uId);
 
//     let result = await Task.find();
// //    console.log("result",result);
//     if (!result) res.send("Not found").status(404);
//     else res.send(result).status(200);
// })


// router.post("/deleteTask",async(req,res)=>{
//     const {clcName,taskId}=req.body;
//     // console.log(req.body);
//     const Task = taskDb.model(clcName,taskSchema);
//     // const query = { _id: ObjectId(taskId) };
//     // console.log(query);
//     try {
//         let result = await Task.deleteOne({ _id: `${taskId}`});

//     // let result = await collection.deleteOne(query);

//     res.send(result).status(200);
//     } catch (error) {
//         res.send(e).status(400).json({error:"Some Error occured"});
//         console.log(error);
        
//     }
    
// })


// router.post("/updateTask/:id", async (req, res) => {
//     // const query = { _id: ObjectId(req.params.id) };
//     // console.log(req.body);
//     // const updates = {
//     //   $push: { isDone: req.body }
//     // };
//    const {clcName}=req.body;
//     const Task =taskDb.model(clcName,taskSchema);

//     let result = await Task.updateOne({ _id: req.params.id}, { $set: req.body });
  
//     res.send(result).status(200);
//   });



// module.exports = router;

const express = require('express');
const router = express.Router();
const taskSchema = require("../models/task");
const taskDb = require("../db/conn")
const dotenv = require('dotenv');
const {MongoClient} = require('mongodb');
dotenv.config({path:'./config.env'});

router.post('/tasks',async(req,res)=>{
    const {date, task,clcName,isDone,desc,tags,links,assignedTo,group,owner,isPublic}= req.body;
const Task = taskDb.model(clcName.toLowerCase(),taskSchema);

  
    try{
        const user= new Task({date,task,isDone,desc,tags,links,assignedTo,group,owner,isPublic});
        const result = await user.save();
        console.log(result);
        res.status(200).json({message:"Added successfully"});
    }catch(e){
        res.status(400).send(e);
    }
})


router.get("/getTask/:id",async(req,res)=>{
//    console.log(req.body)
//    const {clcName,idd}= req.body;
const clcName  = req.params.id;
// console.log(clcName);
// const Task = new mongoose.model(clcName,taskSchema);
const Task = taskDb.model(clcName.toLowerCase(),taskSchema);

    // let collection = await db.collection(req.params.uId);
 
    let result = await Task.find();
//    console.log("result",result);
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
})

router.get("/getSharedTask/:id/:email",async(req,res)=>{
//    console.log(req.body)
//    const {clcName,idd}= req.body;
const clcName  = req.params.id;
const email=req.params.email;
// console.log(clcName);
// const Task = new mongoose.model(clcName,taskSchema);
const Task = taskDb.model(clcName.toLowerCase(),taskSchema);

    // let collection = await db.collection(req.params.uId);

    let result;
 
    let query = await Task.find({ assignedTo: { $elemMatch: { $eq: email } },isPublic:false });
    result=[...query];
    query=await Task.find({ group: { $elemMatch: { $eq: email } },isPublic:false });
    result=[...result,...query];
    query=await Task.find({isPublic:true});
    result=[...result,...query];
   console.log("result",result);
    // if (result.length==0) {
    //     console.log("not found email 1")
    //     result=await Task.find({ group: { $elemMatch: { $eq: email } },isPublic:false });
    //     if(result.length==0){
    //         let publicResult=await Task.find({isPublic:true});
    //         if(publicResult.length==0){
    //             res.send("Not found").status(404);
    //             return;
    //         }
    //     }
    //     }
    //     let publicResult=await Task.find({isPublic:true});
    //     result=[...result,...publicResult]
if(result.length==0) res.send("Not found").status(404);
else
    res.send(result).status(200);
});

router.get("/getAllTasks/:email",async(req,res)=>{

    const DB = process.env.DATABASE;
// const settingDB = process.env.SETTING_DATABASE;
let taskDb;
const client = new MongoClient(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect();
taskDb=client.db('task');
//    console.log(req.body)
//    const {clcName,idd}= req.body;
const email=req.params.email;
// console.log(clcName);
// const Task = new mongoose.model(clcName,taskSchema);
const Task = await taskDb.listCollections().toArray();
let result=[];
console.log(Task);
for(var i in Task){
  if(i){
    var coll = Task[i].name;
    console.log(coll)
    if (coll === "system.indexes") continue;
let query;
    query = await taskDb.collection(coll).find({ assignedTo: { $elemMatch: { $eq: email } },isPublic:false });
    await query.forEach(doc=>{
        result.push(doc);
    })
    query=await taskDb.collection(coll).find({ group: { $elemMatch: { $eq: email } },isPublic:false });
    await query.forEach(doc=>{
        result.push(doc);
    })
    console.log("result",result);
        //  let publicResult=await taskDb.collection(coll).find({isPublic:true});
        //  result=[...result,...publicResult]
     
  }
}
client.close();
if(result.length!=0){
res.send(result).status(200);
}else res.send("Not found").status(404);


})


router.post("/deleteTask",async(req,res)=>{
    const {clcName,taskId}=req.body;
    // console.log(req.body);
    const Task = taskDb.model(clcName.toLowerCase(),taskSchema);
    // const query = { _id: ObjectId(taskId) };
    // console.log(query);
    try {
        let result = await Task.deleteOne({ _id: `${taskId}`});

    // let result = await collection.deleteOne(query);

    res.send(result).status(200);
    } catch (error) {
        res.send(e).status(400).json({error:"Some Error occured"});
        console.log(error);
        
    }
    
})


router.post("/updateTask/:id", async (req, res) => {
    // const query = { _id: ObjectId(req.params.id) };
    // console.log(req.body);
    // const updates = {
    //   $push: { isDone: req.body }
    // };
   const {clcName}=req.body;
    const Task =taskDb.model(clcName.toLowerCase(),taskSchema);

    let result = await Task.updateOne({ _id: req.params.id}, { $set: req.body });
  
    res.send(result).status(200);
  });
module.exports = router;