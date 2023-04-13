const mongoose = require('mongoose');
const validator = require("validator");
const settingdb = require('../db/settingConn');
const settingSchema= new mongoose.Schema({
   
  mail:{
    type:String,
    required:true,

    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  isPublic:{
    type:Boolean,
    required:true,
  },
})




// const task = new mongoose.model("task",taskSchema);

module.exports = settingSchema;