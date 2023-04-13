const mongoose = require('mongoose');

const taskSchema= new mongoose.Schema({
    date:{
        type:String,
        required:true,


    },
    task:{
        type:String,
        required:true,
        trim:true,

    },
    desc:{
        type:String,
        required:false,
        trim:true,

    },
    tags:{
        type:[String],
        required:false,
        trim:true,

    },
    links:{
        type:[String],
        required:false,
        trim:true,

    },
    assignedTo:{
        type:[String],
        required:false,
        trim:true,

    },
    group:{
        type:[String],
        required:false,
        trim:true,

    },
    owner:{
        type:String,
        required:true,
        trim:true,
    },
    isDone:{
        type:Boolean,
        required:true,
    },
    isPublic:{
        type:Boolean,
        required:true,
    }
})

// const task = new mongoose.model("task",taskSchema);

module.exports = taskSchema;