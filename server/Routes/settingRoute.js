// const express = require("express");
// const router = new express.Router();
// const validator = require("validator");

// // const Task = require('../models/task')
// const settingDb = require("../db/settingConn");

// const settingSchema = require("../models/setting");
// const publicSchema = require("../models/public_model");

// router.post("/setting", async (req, res) => {
//   const { clcName, mail,isPublic } = req.body;
//   // console.log(req.body);

//   if (!validator.isEmail(mail)) {
//     res.status(400).json({ error: "Invalid Mail" });
//     return;
//   }
//   const mailModel = settingDb.model(clcName.toLowerCase(), settingSchema);

//   try {
//     const userExist = await mailModel.findOne({ mail: mail });
//     if (userExist) {
//       return res.status(422).json({ error: "user already exists" });
//     }
//     const user = new mailModel({ mail,isPublic });
//     const result = await user.save();
//     // console.log(result);
//     res.status(200).json({ message: "Added successfully" });
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });
// router.post("/defaultSetting", async (req, res) => {
//   const { clcName, userMail,isPublic } = req.body;
//   // console.log(req.body);

//   if (!validator.isEmail(userMail)) {
//     res.status(400).json({ error: "Invalid Mail" });
//     return;
//   }
//   const mailModel = settingDb.model(clcName.toLowerCase(), settingSchema);

//   try {
//     const userExist = await mailModel.findOne({ mail: userMail });
//     if (userExist) {
//       return res.status(422).json({ error: "user already exists" });
//     }
//     const user = new mailModel({ mail,isPublic });
//     const result = await user.save();
//     // console.log(result);
//     res.status(200).json({ message: "Added successfully" });
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

// router.post("/setting/share", async (req, res) => {
//   const { clcName, isPublic } = req.body;
//   // console.log(req.body);

//   const mailModel = settingDb.model(clcName.toLowerCase(), settingSchema);

//   try {
    
//     const result = await mailModel.updateMany({}, { $set: { isPublic } });
//     // console.log(result);
//     res.status(200).json({ message: "Updated successfully" });
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });
// router.get("/getSetting/:id", async (req, res) => {
//   // console.log(req.body);
//   const clcName = req.params.id;
//   //   console.log("id",clcName)

//   const mailModel = settingDb.model(clcName.toLowerCase(), settingSchema);

//   try {
//     const result = await mailModel.find();
//     // console.log(result);
//     if (!result) res.send("Not found").status(404);
//     else res.send(result).status(200);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

// router.get("/share/:id", async (req, res) => {
//   // console.log(req.body);
//   const clcName = req.params.id;
//   //   console.log("id",clcName)

//   const mailModel = settingDb.model(clcName.toLowerCase(), publicSchema);

//   try {
//     const result = await mailModel.find();
//     // console.log(result);
//     if (!result) res.send("Not found").status(404);
//     else res.send(result).status(200);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

// router.post("/deleteMail", async (req, res) => {
//   const { clcName, id } = req.body;
//   // console.log(req.body);
//   const mailModel = settingDb.model(clcName.toLowerCase(), settingSchema);
//   // const query = { _id: ObjectId(taskId) };
//   // console.log(query);
//   try {
//     let result = await mailModel.deleteOne({ _id: `${id}` });

//     // let result = await collection.deleteOne(query);

//     res.send(result).status(200);
//   } catch (error) {
//     res.send(e).json({ error: "some error occured" });
//   }
// });

// router.post("/updateSettings/:id", async (req, res) => {
//   // const query = { _id: ObjectId(req.params.id) };
//   // console.log(req.body);
//   // const updates = {
//   //   $push: { isDone: req.body }
//   // };
//  const {clcName,isPublic}=req.body;
//   const Settings =settingDb.model(clcName.toLowerCase(),publicSchema);

//   let result = await Settings.updateOne({ _id: req.params.id}, { $set: { isPublic } });

//   res.send(result).status(200);
// });

// module.exports = router;
